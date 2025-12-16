// import { X } from "lucide-react";

// const PaymentModal = ({ open, onClose, bookingData, onPay }) => {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">

//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
//         >
//           <X />
//         </button>

//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Confirm Payment
//         </h2>

//         {/* Order Details */}
//         <div className="space-y-2 border rounded-lg p-4 bg-gray-50">
//           <p><b>Product:</b> {bookingData.productTitle}</p>
//           <p><b>Quantity:</b> {bookingData.quantity}</p>
//           <p><b>Unit Price:</b> {bookingData.unitPrice} BDT</p>
//           <p className="text-lg font-semibold text-indigo-600">
//             Total: {bookingData.totalPrice} BDT
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-4 mt-6">
//           <button
//             onClick={onClose}
//             className="w-1/2 py-3 rounded-lg border border-gray-400 hover:bg-gray-100"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={onPay}
//             className="w-1/2 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
//           >
//             Pay Now
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PaymentModal;

// import { X } from "lucide-react";
// import axios from "axios";
// import useAuth from "../../hooks/useAuth";

// const PaymentModal = ({ open, onClose, bookingData }) => {
//   const { user } = useAuth();

//   if (!open || !bookingData) return null;

//   const handlePay = async () => {
//     const paymentInfo = {
//       amount: bookingData.totalPrice,
//       productTitle: bookingData.productTitle,
//       quantity: bookingData.quantity,
//       email: user.email,
//       bookingData,
//     };

//     try {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/create-checkout-session`,
//         paymentInfo
//       );

//       // 🔥 EXACTLY like PurchaseModal
//       window.location.href = data.url;

//     } catch (error) {
//       console.error(error);
//       alert("Payment failed");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">

//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
//         >
//           <X />
//         </button>

//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Review Order
//         </h2>

//         <div className="space-y-2 border rounded-lg p-4 bg-gray-50">
//           <p><b>Product:</b> {bookingData.productTitle}</p>
//           <p><b>Quantity:</b> {bookingData.quantity}</p>
//           <p><b>Unit Price:</b> {bookingData.unitPrice} BDT</p>
//           <p className="text-lg font-semibold text-indigo-600">
//             Total: {bookingData.totalPrice} BDT
//           </p>
//         </div>

//         <div className="flex gap-4 mt-6">
//           <button
//             onClick={onClose}
//             className="w-1/2 py-3 rounded-lg border border-gray-400"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handlePay}
//             className="w-1/2 py-3 rounded-lg bg-indigo-600 text-white font-semibold"
//           >
//             Pay Now
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PaymentModal;

// import { X } from "lucide-react";
// import axios from "axios";
// import useAuth from "../../hooks/useAuth";

// const PaymentModal = ({ open, onClose, bookingData }) => {
//   const { user } = useAuth();

//   if (!open || !bookingData) return null;

//   const handlePay = async () => {
//     try {
//       // Prepare data for backend
//       const paymentInfo = {
//         amount: bookingData.totalPrice,
//         productTitle: bookingData.productTitle,
//         quantity: bookingData.quantity,
//         email: user.email,
//         bookingData,
//       };

//       // Call backend to create Stripe checkout session
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/create-checkout-session`,
//         paymentInfo
//       );

//       // Redirect to Stripe hosted page
//       window.location.href = data.url;

//     } catch (error) {
//       console.error("Payment failed:", error);
//       alert("Payment failed. Try again!");
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-white w-full max-w-lg rounded-xl p-6 relative shadow-lg">

//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
//         >
//           <X size={24} />
//         </button>

//         {/* Header */}
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Review Your Order
//         </h2>

//         {/* Order Summary */}
//         <div className="space-y-2 border rounded-lg p-4 bg-gray-50">
//           <p><strong>Product:</strong> {bookingData.productTitle}</p>
//           <p><strong>Quantity:</strong> {bookingData.quantity}</p>
//           <p><strong>Unit Price:</strong> {bookingData.unitPrice} BDT</p>
//           <p className="text-lg font-semibold text-indigo-600">
//             Total: {bookingData.totalPrice} BDT
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-4 mt-6">
//           <button
//             onClick={onClose}
//             className="w-1/2 py-3 rounded-lg border border-gray-400 hover:bg-gray-100"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handlePay}
//             className="w-1/2 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
//           >
//             Pay Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentModal;

import { X } from "lucide-react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const PaymentModal = ({ open, onClose, bookingData, onPay }) => {
  const { user } = useAuth();
  if (!open || !bookingData) return null;

  // const handlePay = async () => {
  //   try {
  //     const paymentInfo = {
  //       amount: bookingData.totalPrice,
  //       productTitle: bookingData.productTitle,
  //       quantity: bookingData.quantity,
  //       email: user.email,
  //       bookingData,
  //     };
  //     const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, paymentInfo);
  //     window.location.href = data.url;
  //   } catch (error) {
  //     console.error("Payment failed:", error);
  //     alert("Payment failed. Try again!");
  //   }
  // };


  const handlePay = async () => {
  try {
    const paymentInfo = {
      unitPrice: bookingData.unitPrice,   // ✅ unit price
      quantity: bookingData.quantity,     // ✅ quantity
      productTitle: bookingData.productTitle,
      email: user.email,
      productId: bookingData.productId,   // cancel_url এর জন্য দরকার
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    );

    // Stripe hosted page redirect
    window.location.href = data.url;

  } catch (error) {
    console.error("Payment failed:", error);
    alert("Payment failed. Try again!");
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500"><X size={24} /></button>
        <h2 className="text-2xl font-bold mb-4 text-center">Review Your Order</h2>
        <div className="space-y-2 border rounded-lg p-4 bg-gray-50">
          <p><strong>Product:</strong> {bookingData.productTitle}</p>
          <p><strong>Quantity:</strong> {bookingData.quantity}</p>
          <p><strong>Unit Price:</strong> {bookingData.unitPrice} BDT</p>
          <p className="text-lg font-semibold text-indigo-600">Total: {bookingData.totalPrice} BDT</p>
        </div>
        <div className="flex gap-4 mt-6">
          <button onClick={onClose} className="w-1/2 py-3 rounded-lg border border-gray-400 hover:bg-gray-100">Cancel</button>
          <button onClick={handlePay} className="w-1/2 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

