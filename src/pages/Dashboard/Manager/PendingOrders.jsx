import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Eye, Calendar } from "lucide-react";
import Swal from "sweetalert2";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/orders?status=pending");
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Approve Order?",
      text: "Are you sure you want to approve this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Approve",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/orders/approve/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        Swal.fire("Approved!", "Order has been approved.", "success");
        fetchPendingOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Reject Order?",
      text: "Are you sure you want to reject this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/orders/reject/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        Swal.fire("Rejected!", "Order has been rejected.", "success");
        fetchPendingOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-16 w-16 rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Pending Orders</h2>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 rounded-lg">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Quantity</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Order Date</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No pending orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{order.orderId}</td>
                  <td className="px-6 py-4">{order.userEmail}</td>
                  <td className="px-6 py-4">{order.productName}</td>
                  <td className="px-6 py-4">{order.quantity}</td>
                  <td className="px-6 py-4 flex items-center gap-1">
                    <Calendar size={16} className="text-gray-500" />
                    {new Date(order.date).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleApprove(order._id)}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                      >
                        <CheckCircle size={18} />
                      </button>

                      <button
                        onClick={() => handleReject(order._id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        <XCircle size={18} />
                      </button>

                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/*Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Order Details</h3>

            <div className="space-y-2">
              <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
              <p><strong>User:</strong> {selectedOrder.userEmail}</p>
              <p><strong>Product:</strong> {selectedOrder.productName}</p>
              <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleString()}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
            </div>

            <div className="text-right mt-5">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingOrders;
