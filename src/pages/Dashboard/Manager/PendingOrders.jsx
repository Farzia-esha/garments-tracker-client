

import React, { useEffect, useState } from 'react';
import { Check, X, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Shared/Loading';

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = async () => {
    try {
      const res = await fetch(`https://garments-tracker-system.vercel.app/orders/pending`);
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleAction = async (orderId, action) => {
    const actionText = action === 'approve' ? 'approve' : 'reject';
    
    const result = await Swal.fire({
      title: `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} Order?`,
      text: `Are you sure you want to ${actionText} this order?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: action === 'approve' ? '#10b981' : '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Yes, ${actionText} it!`,
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://garments-tracker-system.vercel.app/orders/action/${orderId}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: data.message,
            timer: 1500,
            showConfirmButton: false
          });
          fetchPendingOrders();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: data.message
          });
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to process the request'
        });
      }
    }
  };

  const openViewModal = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Pending Orders</h2>
        <p className="text-gray-600">Review and approve/reject customer orders</p>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div>
            <p className="text-sm text-gray-600">Total Pending</p>
            <p className="text-3xl font-bold ">{orders.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div>
            <p className="text-sm text-gray-600">Total Quantity</p>
            <p className="text-3xl font-bold text-gray-800">
              {orders.reduce((sum, o) => sum + (o.quantity || 0), 0)} pcs
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div>
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-3xl font-bold ">
              {orders.reduce((sum, o) => sum + ((o.unitPrice || 0) * (o.quantity || 0)), 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Total Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Order Date</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg font-semibold">No pending orders</p>
                      <p className="text-sm text-gray-400">All orders have been processed</p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {order._id.slice(-8)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{order.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">{order.productTitle}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {order.quantity} pcs
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-green-600">
                        ৳{((order.unitPrice || 0) * (order.quantity || 0)).toFixed(2)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openViewModal(order)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleAction(order._id, 'approve')}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all"
                          title="Approve Order"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => handleAction(order._id, 'reject')}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                          title="Reject Order"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Order Details Modal */}
      {showViewModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">Order Details</h3>
                  <p className="text-blue-100 text-sm mt-1">Review order information</p>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition text-white"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Order Status */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-sm text-yellow-700 font-semibold">Status: Pending Approval</p>
                    <p className="text-xs text-yellow-600">This order is awaiting your review</p>
                  </div>
                </div>
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Order ID</p>
                  <p className="font-mono font-semibold text-gray-800">{selectedOrder._id}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Payment Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedOrder.paymentStatus === 'paid' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {selectedOrder.paymentStatus === 'paid' ? '✓ Paid' : 'Pending'}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Customer Information
                </h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-semibold text-gray-800">{selectedOrder.email}</p>
                </div>
              </div>

              {/* Product Info */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Product Information
                </h4>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <p className="text-lg font-bold text-gray-800 mb-3">{selectedOrder.productTitle}</p>
                  
                  {selectedOrder.productImage && (
                    <img 
                      src={selectedOrder.productImage} 
                      alt={selectedOrder.productTitle}
                      className="w-full max-w-sm rounded-lg mb-3 shadow-md"
                    />
                  )}
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-white p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">Quantity</p>
                      <p className="text-xl font-bold text-gray-800">{selectedOrder.quantity}</p>
                      <p className="text-xs text-gray-500">pcs</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">Unit Price</p>
                      <p className="text-xl font-bold text-blue-600">৳{selectedOrder.unitPrice}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <p className="text-xs text-gray-500 mb-1">Total</p>
                      <p className="text-xl font-bold text-green-600">
                        ৳{((selectedOrder.unitPrice || 0) * (selectedOrder.quantity || 0)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Date */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Order Timeline
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Order Placed On</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(selectedOrder.createdAt).toLocaleString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  handleAction(selectedOrder._id, 'reject');
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2"
              >
                <X size={18} />
                Reject Order
              </button>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  handleAction(selectedOrder._id, 'approve');
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
              >
                <Check size={18} />
                Approve Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingOrders;
