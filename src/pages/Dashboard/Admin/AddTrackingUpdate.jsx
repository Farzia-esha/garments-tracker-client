import React, { useState } from 'react';
import { Package, Upload } from 'lucide-react';
import Swal from 'sweetalert2';

const AddTrackingUpdate = ({ bookingId, onSuccess }) => {
  const [formData, setFormData] = useState({
    step: '',
    status: 'in-progress',
    location: '',
    notes: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);

  const productionSteps = [
    'Order Placed',
    'Cutting Started',
    'Cutting Completed',
    'Sewing Started',
    'Sewing Completed',
    'Finishing',
    'QC Checked',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'delayed', label: 'Delayed' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.step) {
      Swal.fire('Error', 'Please select a production step', 'error');
      return;
    }

    setLoading(true);

    try {
      const stepIndex = productionSteps.indexOf(formData.step);
      
      const trackingData = {
        ...formData,
        stepIndex,
        timestamp: new Date().toISOString()
      };

      const response = await fetch(
        `https://garments-tracker-system.vercel.app/tracking/${bookingId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trackingData)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add tracking update');
      }

      Swal.fire('Success', 'Tracking update added successfully', 'success');
      
      // Reset form
      setFormData({
        step: '',
        status: 'in-progress',
        location: '',
        notes: '',
        imageUrl: ''
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to add tracking update', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 p-3 rounded-lg">
          <Package size={24} className="text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold">Add Tracking Update</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Production Step */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Production Step *
          </label>
          <select
            name="step"
            value={formData.step}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">Select a step</option>
            {productionSteps.map(step => (
              <option key={step} value={step}>{step}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Status *
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Factory Floor 2, Warehouse A"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Add any additional details or comments..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Image URL (Optional)
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button
              type="button"
              className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              title="Upload Image"
            >
              <Upload size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Upload image to a hosting service and paste the URL here
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding Update...' : 'Add Tracking Update'}
        </button>
      </form>
    </div>
  );
};

export default AddTrackingUpdate;