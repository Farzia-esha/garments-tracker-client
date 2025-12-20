import React, { useEffect, useState } from 'react';
import { Plus, Search, Eye, MapPin } from 'lucide-react';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Shared/Loading';
import AddTrackingUpdate from './AddTrackingUpdate';

const ManageTracking = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [searchTerm, bookings]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://garments-tracker-system.vercel.app/bookings`);
      const data = await response.json();
      
      // Only show approved bookings
      const approvedBookings = data.filter(b => b.orderStatus === 'approved');
      setBookings(approvedBookings);
      setFilteredBookings(approvedBookings);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to fetch bookings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    if (!searchTerm) {
      setFilteredBookings(bookings);
      return;
    }

    const filtered = bookings.filter(booking => 
      booking._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.productTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookings(filtered);
  };

  const handleAddTracking = (booking) => {
    setSelectedBooking(booking);
    setShowAddModal(true);
  };

  const handleViewTracking = async (bookingId) => {
    try {
      const response = await fetch(`https://garments-tracker-system.vercel.app/tracking/booking/${bookingId}`);
      const data = await response.json();

      if (data.tracking && data.tracking.length > 0) {
        const trackingHTML = data.tracking.map((t, i) => `
          <div class="text-left border-b pb-3 mb-3 ${i === data.tracking.length - 1 ? 'border-b-0' : ''}">
            <div class="flex justify-between items-start mb-2">
              <strong class="text-indigo-600">${t.step}</strong>
              <span class="text-xs px-2 py-1 rounded ${
                t.status === 'completed' ? 'bg-green-100 text-green-700' :
                t.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }">${t.status}</span>
            </div>
            <p class="text-sm text-gray-600 mb-1">📍 ${t.location || 'N/A'}</p>
            <p class="text-xs text-gray-500">${new Date(t.timestamp).toLocaleString()}</p>
            ${t.notes ? `<p class="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">${t.notes}</p>` : ''}
          </div>
        `).join('');

        Swal.fire({
          title: 'Tracking History',
          html: `
            <div class="max-h-96 overflow-y-auto">
              ${trackingHTML}
            </div>
          `,
          width: '600px',
          confirmButtonText: 'Close',
          confirmButtonColor: '#4F46E5'
        });
      } else {
        Swal.fire('Info', 'No tracking updates yet for this order', 'info');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to fetch tracking history', 'error');
    }
  };

  const handleTrackingSuccess = () => {
    setShowAddModal(false);
    setSelectedBooking(null);
    fetchBookings();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">Manage Order Tracking</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by Order ID, Product, or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
          <p className="text-sm text-gray-600">Total Approved Orders</p>
          <p className="text-2xl font-bold text-indigo-600">{bookings.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-gray-600">With Tracking</p>
          <p className="text-2xl font-bold text-green-600">
            {bookings.filter(b => b.currentTrackingStep).length}
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <p className="text-sm text-gray-600">Pending Tracking</p>
          <p className="text-2xl font-bold text-yellow-600">
            {bookings.filter(b => !b.currentTrackingStep).length}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Current Step</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map(booking => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                      {booking._id.slice(-8)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-sm">{booking.name}</p>
                    <p className="text-xs text-gray-500">{booking.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-sm">{booking.productTitle}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-sm">{booking.quantity} pcs</td>
                  <td className="px-4 py-3">
                    {booking.currentTrackingStep ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        <MapPin size={12} />
                        {booking.currentTrackingStep}
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        Not started
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleAddTracking(booking)}
                        className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
                        title="Add Tracking Update"
                      >
                        <Plus size={18} />
                      </button>
                      <button
                        onClick={() => handleViewTracking(booking._id)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                        title="View Tracking History"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No approved orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Tracking Modal */}
      {showAddModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">Add Tracking Update</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Order: {selectedBooking.productTitle} ({selectedBooking._id.slice(-8)})
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedBooking(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <AddTrackingUpdate
                bookingId={selectedBooking._id}
                onSuccess={handleTrackingSuccess}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTracking;