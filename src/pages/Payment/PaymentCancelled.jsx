import React from 'react';
import { useNavigate } from 'react-router';
import { XCircle } from 'lucide-react';

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gray-800 text-white p-8 text-center">
          <XCircle className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Payment Cancelled</h1>
          <p className="text-red-100">Your payment was not completed</p>
        </div>

        {/* Message */}
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">What happened?</h3>
            <p className="text-gray-600 mb-4">
              You cancelled the payment process. Your order was not placed and no charges were made.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/all-products')}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Browse Products
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;