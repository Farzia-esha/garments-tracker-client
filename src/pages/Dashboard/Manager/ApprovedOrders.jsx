import React, { useEffect, useState } from "react";
import { Eye, PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

const ApprovedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingList, setTrackingList] = useState([]);
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
    const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/approved`);
    const data = await res.json();
    setOrders(data);
  };

  const fetchTracking = async (orderId) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tracking/${orderId}`);
    const data = await res.json();
    setTrackingList(data);
  };

  const handleAddTracking = async () => {
    if (!trackingData.status || !trackingData.location) {
      Swal.fire("Error!", "Status and Location are required!", "error");
      return;
    }

    const newEntry = {
      ...trackingData,
      orderId: selectedOrder._id,
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    });

    if (res.ok) {
      Swal.fire("Added!", "Tracking information added.", "success");
      setShowTrackingModal(false);
      setTrackingData({ location: "", note: "", status: "" });
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Approved Orders</h2>
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">User</th>
              <th className="p-4">Product</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Approved Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-4">{order._id}</td>
                <td className="p-4">{order.userEmail}</td>
                <td className="p-4">{order.productTitle}</td>
                <td className="p-4">{order.quantity}</td>
                <td className="p-4">
                  {new Date(order.approvedAt).toLocaleString()}
                </td>

                <td className="p-4 flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowTrackingModal(true);
                    }}
                    className="p-2 bg-blue-100 text-blue-700 rounded-lg"
                  >
                    <PlusCircle size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      fetchTracking(order._id);
                      setShowViewModal(true);
                    }}
                    className="p-2 bg-green-100 text-green-700 rounded-lg"
                  >
                    <Eye size={18} />
                  </button>
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

      {/* Modal */}
      {showTrackingModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Add Tracking</h3>
            <label className="block mb-2">Status</label>
            <select
              className="w-full p-2 border rounded mb-3"
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

            <label className="block mb-2">Location</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-3"
              value={trackingData.location}
              onChange={(e) =>
                setTrackingData({ ...trackingData, location: e.target.value })
              }
            />

            <label className="block mb-2">Note (optional)</label>
            <textarea
              className="w-full p-2 border rounded mb-3"
              value={trackingData.note}
              onChange={(e) =>
                setTrackingData({ ...trackingData, note: e.target.value })
              }
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowTrackingModal(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTracking}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Tracking Timeline</h3>
            {trackingList.map((t) => (
              <div
                key={t._id}
                className="border-l-4 border-blue-600 pl-4 mb-4"
              >
                <p className="font-bold">{t.status}</p>
                <p className="text-gray-600">{t.location}</p>
                {t.note && <p className="text-gray-500 mt-1">{t.note}</p>}
                <p className="text-sm text-gray-400">
                  {new Date(t.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
            {trackingList.length === 0 && (
              <p className="text-gray-500">No tracking updates yet.</p>
            )}

            <button
              onClick={() => setShowViewModal(false)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded"
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
