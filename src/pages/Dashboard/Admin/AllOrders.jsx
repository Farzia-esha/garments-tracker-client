import React, { useEffect, useState } from 'react';
import { Search, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Shared/Loading';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [statusFilter, searchTerm, orders]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/bookings`);
      const data = await res.json();
      setOrders(data);
      setFilteredOrders(data);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to fetch orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = orders;
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.orderStatus === statusFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.productTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  const viewOrderDetails = (order) => {
    Swal.fire({
      title: 'Order Details',
      html: `
        <div class="text-left space-y-2">
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Customer:</strong> ${order.firstName} ${order.lastName}</p>
          <p><strong>Email:</strong> ${order.email}</p>
          <p><strong>Product:</strong> ${order.productTitle}</p>
          <p><strong>Quantity:</strong> ${order.quantity} pcs</p>
          <p><strong>Unit Price:</strong> ৳${order.unitPrice}</p>
          <p><strong>Total Price:</strong> ৳${order.totalPrice}</p>
          <p><strong>Contact:</strong> ${order.contact}</p>
          <p><strong>Address:</strong> ${order.address}</p>
          <p><strong>Payment Mode:</strong> ${order.paymentMode}</p>
          <p><strong>Status:</strong> <span class="font-semibold ${
            order.orderStatus === 'approved' ? 'text-green-600' :
            order.orderStatus === 'rejected' ? 'text-red-600' :
            'text-yellow-600'
          }">${order.orderStatus}</span></p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
          ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ''}
        </div>
      `,
      width: '600px',
      confirmButtonText: 'Close',
      confirmButtonColor: '#4F46E5'
    });
  };

  const getStatusStats = () => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.orderStatus === 'pending').length,
      approved: orders.filter(o => o.orderStatus === 'approved').length,
      rejected: orders.filter(o => o.orderStatus === 'rejected').length
    };
  };

  if (loading) { return ( <div><Loading/></div> );}

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow p-6">
          <p className=" text-sm">Total Orders</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className=" text-sm">Pending</p>
          <p className="text-3xl font-bold">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className=" text-sm">Approved</p>
          <p className="text-3xl font-bold">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className=" text-sm">Rejected</p>
          <p className="text-3xl font-bold">{stats.rejected}</p>
        </div>
      </div>
      {/* all order */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 ">All Orders</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by email, product, or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        {/*  Count */}
        <p className="text-sm text-gray-600 mb-4">
          Showing {filteredOrders.length} of {orders.length} orders
        </p>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                      {order._id.slice(-6)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold">
                        {order.firstName} {order.lastName}
                      </p>
                      <p className="text-xs">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{order.productTitle}</td>
                  <td className="px-4 py-3 text-sm">{order.quantity} pcs</td>
                  <td className="px-4 py-3">
                    <span className="font-bold">{order.totalPrice}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.orderStatus === 'approved' ? 'bg-green-200 text-green-600' :
                      order.orderStatus === 'rejected' ? 'bg-red-200 text-red-600' :
                      'bg-yellow-200 text-yellow-600'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => viewOrderDetails(order)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                      title="View Details"
                    >
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;