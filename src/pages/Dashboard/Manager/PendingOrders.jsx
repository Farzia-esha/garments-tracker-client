import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const PendingOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/manager/pending-orders`);
    const data = await res.json();
    setOrders(data);
  };

  const handleAction = async (orderId, action) => {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/manager/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });

    if (result.ok) {
      Swal.fire('Success', `Order ${action}ed`, 'success');
      fetchPendingOrders();
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Pending Orders</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Order Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.email}</td>
              <td>{o.productTitle}</td>
              <td>{o.quantity}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td className="flex gap-2">
                <button onClick={() => handleAction(o._id, 'approve')} className="bg-green-500 text-white px-2 py-1 rounded">Approve</button>
                <button onClick={() => handleAction(o._id, 'reject')} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingOrders;
