import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const PaymentModal = ({ open, onClose, bookingData }) => {
  const navigate = useNavigate();

  if (!open) return null;

  const handleCashOnDelivery = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      Swal.fire("Success", "Order placed with Cash On Delivery!", "success");
      onClose();
      navigate("/dashboard/my-orders");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to place order", "error");
    }
  };

  const handlePayOnline = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingData }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to initiate payment", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>
        <button onClick={handlePayOnline} className="btn btn-primary w-full mb-3">
          Pay Online
        </button>
        <button onClick={handleCashOnDelivery} className="btn btn-secondary w-full mb-3">
          Cash On Delivery
        </button>
        <button onClick={onClose} className="btn btn-ghost w-full">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;

