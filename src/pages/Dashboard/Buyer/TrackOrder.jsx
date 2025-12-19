import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Package, CheckCircle, Clock, MapPin } from "lucide-react";
import Swal from "sweetalert2";
import Loading from "../../../Components/Shared/Loading";

const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [timeline, setTimeline] = useState([]);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("TrackOrder - orderId from useParams:", orderId);
    
    // Check if orderId is valid
    if (!orderId || orderId === ':orderId') {
      setError('Invalid order ID');
      setLoading(false);
      return;
    }

    fetchTrackingData();
  }, [orderId]);

  const fetchTrackingData = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = `${import.meta.env.VITE_API_URL}/tracking/booking/${orderId}`;
      console.log("Fetching from URL:", url);

      const response = await fetch(url);
      const data = await response.json();

      console.log("Response data:", data);

      if (data.success) {
        setBooking(data.booking);
        setTimeline(data.timeline || []);
      } else {
        setError(data.message || 'Failed to fetch tracking data');
        Swal.fire("Error", data.message, "error");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError('Failed to fetch tracking info');
      Swal.fire("Error", "Failed to fetch tracking info", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl my-10">
        <div className="text-center">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Tracking</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={fetchTrackingData}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/dashboard/my-orders')}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl my-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <button
            onClick={() => navigate('/dashboard/my-orders')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white shadow-xl rounded-xl p-6">
        <button
          onClick={() => navigate('/dashboard/my-orders')}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Orders</span>
        </button>

        <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
        <p className="text-gray-600">
          Order ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{booking._id}</span>
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Product</p>
            <p className="font-semibold">{booking.productTitle}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Payment Status</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              booking.paymentStatus === 'paid' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {booking.paymentStatus}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Order Status</p>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              {booking.orderStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Production Timeline</h2>
        
        {timeline && timeline.length > 0 ? (
          <div className="space-y-6">
            {timeline.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
                }`}>
                  {step.completed ? (
                    <CheckCircle size={20} className="text-white" />
                  ) : (
                    <Clock size={20} className="text-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className={`font-semibold ${
                    step.completed ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.step}
                  </p>
                  {step.date && (
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Clock size={14} />
                      {new Date(step.date).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>

                {/* Timeline line */}
                {index !== timeline.length - 1 && (
                  <div className="absolute left-[2.5rem] top-12 w-0.5 h-12 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No tracking updates yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Your order tracking will appear here once processing starts
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default TrackOrder;

