import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import Loading from '../../../Components/Shared/Loading';

const TrackOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${user.email}`);
      const data = await res.json();
      // Filter only paid orders
      const paidOrders = data.filter(o => o.paymentStatus?.toLowerCase() === 'paid');
      setOrders(paidOrders);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to fetch orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrder = (orderId) => {
    navigate(`/dashboard/track-order/${orderId}`);
  };

  if (loading) return <Loading />;

  if (orders.length === 0)
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">No paid orders to track</p>
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Track Your Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map(order => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{order._id.slice(-6)}</td>
                <td className="px-4 py-3">{order.productTitle}</td>
                <td className="px-4 py-3">{order.quantity}</td>
                <td className="px-4 py-3">{order.totalPrice}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleTrackOrder(order._id)}
                    className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-1 mx-auto"
                  >
                    <MapPin size={18} /> Track
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrackOrders;
