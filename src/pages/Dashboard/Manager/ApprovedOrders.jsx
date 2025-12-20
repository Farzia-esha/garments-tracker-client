
import React, { useEffect, useState } from "react";
import { Eye, PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

const ApprovedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingTimeline, setTrackingTimeline] = useState([]);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [trackingData, setTrackingData] = useState({
    location: "",
    note: "",
    status: "",
  });

  const statuses = [
    "Cutting Completed",
    "Sewing Started",
    "Finishing",
    "QC Checked",
    "Packed",
    "Shipped",
    "Out for Delivery"
  ];

  useEffect(() => {
    fetchApprovedOrders();
  }, []);

  const fetchApprovedOrders = async () => {
    const res = await fetch(`https://garments-tracker-system.vercel.app/orders/approved`);
    const data = await res.json();
    setOrders(data);
  };

  const fetchTracking = async (orderId) => {
    const res = await fetch(
      `https://garments-tracker-system.vercel.app/tracking/booking/${orderId}`
    );
    const data = await res.json();
    if (data.success) {
      setTrackingTimeline(data.timeline);
    }
  };

  const handleAddTracking = async () => {
    if (!trackingData.status || !trackingData.location) {
      Swal.fire("Error!", "Status and Location are required!", "error");
      return;
    }

    const res = await fetch(`https://garments-tracker-system.vercel.app/tracking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: selectedOrder._id,
        status: trackingData.status,
        location: trackingData.location,
        note: trackingData.note
      }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      Swal.fire("Added!", "Tracking information added.", "success");
      setShowTrackingModal(false);
      setTrackingData({ location: "", note: "", status: "" });
      fetchApprovedOrders();
    } else {
      Swal.fire("Error!", data.message || "Failed to add tracking", "error");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Approved Orders</h2>
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Qty</th>
              <th className="p-4 text-left">Approved Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-mono text-sm">{order._id}</td>
                <td className="p-4">{order.email}</td>
                <td className="p-4 font-semibold">{order.productTitle}</td>
                <td className="p-4">{order.quantity} pcs</td>
                <td className="p-4 text-sm text-gray-600">
                  {order.approvedAt ? new Date(order.approvedAt).toLocaleString() : 'N/A'}
                </td>

                <td className="p-4">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowTrackingModal(true);
                      }}
                      className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                      title="Add Tracking"
                    >
                      <PlusCircle size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        fetchTracking(order._id);
                        setShowViewModal(true);
                      }}
                      className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                      title="View Timeline"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No Approved Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Tracking Modal */}
      {showTrackingModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Add Tracking Update</h3>
            
            <div className="mb-3">
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-mono font-semibold">{selectedOrder?._id}</p>
            </div>

            <label className="block mb-2 font-semibold">Status *</label>
            <select
              className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={trackingData.status}
              onChange={(e) =>
                setTrackingData({ ...trackingData, status: e.target.value })
              }
            >
              <option value="">Select status</option>
              {statuses.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>

            <label className="block mb-2 font-semibold">Location *</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={trackingData.location}
              onChange={(e) =>
                setTrackingData({ ...trackingData, location: e.target.value })
              }
              placeholder="e.g., Factory Floor 2, Dhaka"
            />

            <label className="block mb-2 font-semibold">Note (optional)</label>
            <textarea
              className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={trackingData.note}
              onChange={(e) =>
                setTrackingData({ ...trackingData, note: e.target.value })
              }
              rows="3"
              placeholder="Additional information..."
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowTrackingModal(false);
                  setTrackingData({ location: "", note: "", status: "" });
                }}
                className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTracking}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Timeline Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">Order Tracking Timeline</h3>
            
            {selectedOrder && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-mono font-semibold mb-2">{selectedOrder._id}</p>
                <p className="text-sm text-gray-600">Product</p>
                <p className="font-semibold">{selectedOrder.productTitle}</p>
              </div>
            )}

            <div className="space-y-4">
              {trackingTimeline.map((t, index) => (
                <div
                  key={index}
                  className={`border-l-4 pl-4 pb-4 ${
                    t.completed ? 'border-green-500' : 'border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-3 h-3 rounded-full ${
                      t.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <p className={`font-bold ${t.completed ? 'text-green-700' : 'text-gray-500'}`}>
                      {t.step}
                    </p>
                  </div>
                  
                  {t.completed && (
                    <>
                      {t.location && (
                        <p className="text-gray-700 ml-5">
                          📍 {t.location}
                        </p>
                      )}
                      {t.note && (
                        <p className="text-gray-600 ml-5 mt-1 text-sm">
                          {t.note}
                        </p>
                      )}
                      {t.date && (
                        <p className="text-sm text-gray-500 ml-5 mt-1">
                          {new Date(t.date).toLocaleString()}
                        </p>
                      )}
                    </>
                  )}
                  
                  {!t.completed && (
                    <p className="text-gray-400 ml-5 text-sm">Pending...</p>
                  )}
                </div>
              ))}

              {trackingTimeline.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No tracking updates yet. Timeline will be created automatically when order is approved.
                </p>
              )}
            </div>

            <button
              onClick={() => setShowViewModal(false)}
              className="mt-6 w-full px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedOrders;