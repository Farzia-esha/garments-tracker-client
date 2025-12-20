import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const ApprovedOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [newStep, setNewStep] = useState('');

  const statuses = [
    'Cutting Completed',
    'Sewing Started',
    'Finishing',
    'QC Checked',
    'Packed',
    'Shipped',
    'Out for Delivery'
  ];

  useEffect(() => {
    fetchApprovedOrders();
  }, []);

  const fetchApprovedOrders = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/manager/approved-orders`);
    const data = await res.json();
    setOrders(data);
  };

  const handleAddTracking = async (orderId) => {
    if (!newStep) {
      Swal.fire('Error', 'Please select a tracking step', 'error');
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/manager/approved-orders/tracking/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step: newStep }),
    });

    if (res.ok) {
      Swal.fire('Success', 'Tracking updated', 'success');
      setNewStep('');
      fetchApprovedOrders();
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Approved Orders</h2>
      {orders.map((o) => (
        <div key={o._id} className="mb-4 border p-4 rounded">
          <p><b>Order ID:</b> {o._id}</p>
          <p><b>User:</b> {o.email}</p>
          <p><b>Product:</b> {o.productTitle}</p>
          <p><b>Quantity:</b> {o.quantity}</p>
          <p><b>Approved Date:</b> {new Date(o.updatedAt).toLocaleString()}</p>

          <div className="mt-2">
            <h4 className="font-bold">Tracking Timeline:</h4>
            <ul className="list-disc ml-5">
              {o.timeline?.map((t, index) => (
                <li key={index}>
                  {t.step} - {t.completed ? 'processing' : 'complete'} {t.note || ''}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-2 flex gap-2 items-center">
            <select
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="">Select tracking step</option>
              {statuses.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
            <button
              onClick={() => handleAddTracking(o._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add Tracking
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApprovedOrders;

