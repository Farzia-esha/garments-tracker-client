import React, { useEffect, useState } from 'react';
import { Eye, XCircle, MapPin } from 'lucide-react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${user.email}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to fetch orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const viewOrderDetails = (order) => {
    Swal.fire({
      title: 'Order Details',
      html: `
        <div class="text-left space-y-2">
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Product:</strong> ${order.productTitle}</p>
          <p><strong>Quantity:</strong> ${order.quantity} pcs</p>
          <p><strong>Unit Price:</strong> ${order.unitPrice}</p>
          <p><strong>Total Price:</strong> ${order.totalPrice}</p>
          <p><strong>Contact:</strong> ${order.contact}</p>
          <p><strong>Delivery Address:</strong> ${order.address}</p>
          <p><strong>Payment Mode:</strong> ${order.paymentMode}</p>
          <p><strong>Payment Status:</strong> <span class="font-semibold ${
            order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
          }">${order.paymentStatus}</span></p>
          <p><strong>Order Status:</strong> <span class="font-semibold ${
            order.orderStatus === 'approved' ? 'text-green-600' :
            order.orderStatus === 'rejected' ? 'text-red-600' :
            'text-yellow-600'
          }">${order.orderStatus}</span></p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ''}
          ${order.rejectionReason ? `<p class="text-red-600"><strong>Rejection Reason:</strong> ${order.rejectionReason}</p>` : ''}
        </div>
      `,
      width: '600px',
      confirmButtonText: 'Close',
      confirmButtonColor: '#4F46E5'
    });
  };

  const handleCancelOrder = async (orderId, productTitle) => {
    const result = await Swal.fire({
      title: 'Cancel Order?',
      text: `Are you sure you want to cancel "${productTitle}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${orderId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          Swal.fire('Cancelled!', 'Your order has been cancelled.', 'success');
          fetchOrders();
        }
      } catch (error) {
        Swal.fire('Error', 'Failed to cancel order', 'error');
      }
    }
  };

  const viewTracking = async (orderId, productTitle) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tracking/${orderId}`);
      const trackingData = await res.json();

      if (trackingData.length === 0) {
        Swal.fire('No Tracking Available', 'Tracking information will be updated soon', 'info');
        return;
      }

      const timeline = trackingData.map((t, index) => `
        <div class="relative ${index !== trackingData.length - 1 ? 'pb-6' : ''}">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-10 h-10 rounded-full ${
              index === 0 ? 'bg-green-500' : 'bg-gray-300'
            } flex items-center justify-center text-white font-bold">
              ${index + 1}
            </div>
            <div class="flex-1">
              <p class="font-bold text-lg">${t.status}</p>
              <p class="text-sm text-gray-600"> ${t.location}</p>
              <p class="text-xs text-gray-500">${new Date(t.timestamp).toLocaleString()}</p>
              ${t.note ? `<p class="text-sm mt-1 text-gray-700">${t.note}</p>` : ''}
            </div>
          </div>
          ${index !== trackingData.length - 1 ? '<div class="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200"></div>' : ''}
        </div>
      `).join('');

      Swal.fire({
        title: `Tracking: ${productTitle}`,
        html: `<div class="text-left p-4">${timeline}</div>`,
        width: '700px',
        confirmButtonText: 'Close',
        confirmButtonColor: '#4F46E5'
      });
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch tracking information', 'error');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'not-required': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {orders.filter(o => o.orderStatus === 'pending').length}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-2xl font-bold text-green-600">
            {orders.filter(o => o.orderStatus === 'approved').length}
          </p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <p className="text-sm text-gray-600">Rejected</p>
          <p className="text-2xl font-bold text-red-600">
            {orders.filter(o => o.orderStatus === 'rejected').length}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Payment</th>
              <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map(order => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    {order._id.slice(-6)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold">{order.productTitle}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </td>
                <td className="px-4 py-3 text-sm">{order.quantity} pcs</td>
                <td className="px-4 py-3">
                  <span className="font-bold text-indigo-600">৳{order.totalPrice}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => viewOrderDetails(order)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    {order.orderStatus === 'approved' && (
                      <button
                        onClick={() => viewTracking(order._id, order.productTitle)}
                        className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
                        title="Track Order"
                      >
                        <MapPin size={18} />
                      </button>
                    )}
                    {order.orderStatus === 'pending' && (
                      <button
                        onClick={() => handleCancelOrder(order._id, order.productTitle)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        title="Cancel Order"
                      >
                        <XCircle size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No orders yet</p>
            <button
              onClick={() => navigate('/all-products')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;