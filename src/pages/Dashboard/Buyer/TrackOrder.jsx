// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router';
// import { Package, MapPin, Clock, ArrowLeft, CheckCircle, Truck, Box } from 'lucide-react';
// import Swal from 'sweetalert2';
// import Loading from '../../../Components/Shared/Loading';

// const TrackOrder = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();
//   const [order, setOrder] = useState(null);
//   const [tracking, setTracking] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchOrderAndTracking();
//   }, [orderId]);

//   const fetchOrderAndTracking = async () => {
//     try {
//       // Fetch order details
//       const orderRes = await fetch(`${import.meta.env.VITE_API_URL}/bookings`);
//       const allOrders = await orderRes.json();
//       const foundOrder = allOrders.find(o => o._id === orderId);
      
//       if (!foundOrder) {
//         Swal.fire('Not Found', 'Order not found', 'error');
//         navigate('/dashboard/track-order/:orderId');
//         return;
//       }

//       setOrder(foundOrder);

//       // Fetch tracking info
//       const trackRes = await fetch(`${import.meta.env.VITE_API_URL}/tracking/${orderId}`);
//       const trackData = await trackRes.json();
//       setTracking(trackData);

//     } catch (error) {
//       console.error('Error:', error);
//       Swal.fire('Error', 'Failed to fetch tracking information', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusIcon = (status, isLatest) => {
//     const iconSize = isLatest ? 28 : 24;
//     const iconClass = isLatest ? 'text-green-600' : 'text-gray-400';

//     switch (status) {
//       case 'Cutting Completed':
//         return <Box size={iconSize} className={iconClass} />;
//       case 'Sewing Started':
//         return <Package size={iconSize} className={iconClass} />;
//       case 'Finishing':
//         return <CheckCircle size={iconSize} className={iconClass} />;
//       case 'QC Checked':
//         return <CheckCircle size={iconSize} className={iconClass} />;
//       case 'Packed':
//         return <Box size={iconSize} className={iconClass} />;
//       case 'Shipped':
//       case 'Out for Delivery':
//         return <Truck size={iconSize} className={iconClass} />;
//       case 'Delivered':
//         return <CheckCircle size={iconSize} className={iconClass} />;
//       default:
//         return <Package size={iconSize} className={iconClass} />;
//     }
//   };

//   const getStatusColor = (status, isLatest) => {
//     if (isLatest) {
//       return 'bg-green-100 text-green-800 border-green-300';
//     }
//     return 'bg-gray-100 text-gray-600 border-gray-300';
//   };

//   const formatDateTime = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return {
//       date: date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       }),
//       time: date.toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit'
//       })
//     };
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   if (!order) {
//     return (
//       <div className="text-center py-20">
//         <Package className="mx-auto text-gray-300 mb-4" size={64} />
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
//         <button
//           onClick={() => navigate('/dashboard/my-orders')}
//           className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//         >
//           Back to My Orders
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto">
      
//       {/* Back Button */}
//       <button
//         onClick={() => navigate('/dashboard/my-orders')}
//         className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-6"
//       >
//         <ArrowLeft size={20} />
//         Back to My Orders
//       </button>

//       {/* Page Header */}
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
//           <div className="flex items-center gap-3">
//             <Package size={32} />
//             <div>
//               <h1 className="text-2xl font-bold">Track Your Order</h1>
//               <p className="text-indigo-100">Order ID: {orderId.slice(-8)}</p>
//             </div>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Product</p>
//               <p className="font-semibold text-gray-800">{order.productTitle}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Quantity</p>
//               <p className="font-semibold text-gray-800">{order.quantity} pcs</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Total Amount</p>
//               <p className="font-semibold text-indigo-600">৳{order.totalPrice}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600 mb-1">Order Status</p>
//               <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
//                 order.orderStatus === 'approved' ? 'bg-green-100 text-green-700' :
//                 order.orderStatus === 'rejected' ? 'bg-red-100 text-red-700' :
//                 'bg-yellow-100 text-yellow-700'
//               }`}>
//                 {order.orderStatus?.toUpperCase()}
//               </span>
//             </div>
//           </div>

//           {/* Delivery Address */}
//           <div className="mt-6 pt-6 border-t">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
//                 <p className="text-gray-800">{order.address}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Contact Number</p>
//                 <p className="text-gray-800">{order.contact}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tracking Timeline */}
//       {tracking.length > 0 ? (
//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
//             <MapPin className="text-indigo-600" size={28} />
//             Tracking Timeline
//           </h2>

//           <div className="relative">
//             {/* Vertical Timeline Line */}
//             <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

//             {/* Timeline Items */}
//             <div className="space-y-8">
//               {tracking.map((track, index) => {
//                 const isLatest = index === 0;
//                 const dateTime = formatDateTime(track.timestamp);

//                 return (
//                   <div key={track._id} className="relative flex gap-6">
//                     {/* Icon Circle */}
//                     <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${
//                       isLatest 
//                         ? 'bg-green-100 border-green-500 shadow-lg' 
//                         : 'bg-gray-100 border-gray-300'
//                     }`}>
//                       {getStatusIcon(track.status, isLatest)}
//                     </div>

//                     {/* Content Card */}
//                     <div className={`flex-1 rounded-xl p-6 border-2 transition-all ${
//                       isLatest 
//                         ? 'bg-green-50 border-green-200 shadow-md' 
//                         : 'bg-gray-50 border-gray-200'
//                     }`}>
                      
//                       {/* Header */}
//                       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
//                         <h3 className="text-xl font-bold text-gray-800 mb-2 md:mb-0">
//                           {track.status}
//                         </h3>
//                         <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold border-2 ${
//                           getStatusColor(track.status, isLatest)
//                         }`}>
//                           {isLatest ? '🔴 CURRENT STATUS' : '✓ COMPLETED'}
//                         </span>
//                       </div>

//                       {/* Location */}
//                       <div className="flex items-center gap-2 text-gray-700 mb-3">
//                         <MapPin size={18} className="text-indigo-600 flex-shrink-0" />
//                         <p className="font-semibold">{track.location}</p>
//                       </div>

//                       {/* Date & Time */}
//                       <div className="flex items-center gap-2 text-gray-600 mb-4">
//                         <Clock size={18} className="text-gray-400 flex-shrink-0" />
//                         <p className="text-sm">
//                           <span className="font-medium">{dateTime.date}</span>
//                           {' at '}
//                           <span className="font-medium">{dateTime.time}</span>
//                         </p>
//                       </div>

//                       {/* Notes */}
//                       {track.note && (
//                         <div className="bg-white rounded-lg p-4 border border-gray-200">
//                           <p className="text-sm font-semibold text-gray-700 mb-1">📝 Note:</p>
//                           <p className="text-gray-700">{track.note}</p>
//                         </div>
//                       )}

//                       {/* Latest Badge */}
//                       {isLatest && (
//                         <div className="mt-4 pt-4 border-t border-green-300">
//                           <p className="text-sm text-green-700 font-medium">
//                             ✨ This is the most recent update for your order
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Summary */}
//           <div className="mt-8 pt-8 border-t">
//             <p className="text-sm text-gray-600">
//               📦 <strong>Total Updates:</strong> {tracking.length} tracking updates
//             </p>
//             <p className="text-sm text-gray-600 mt-1">
//               🕐 <strong>Last Updated:</strong> {tracking.length > 0 ? formatDateTime(tracking[0].timestamp).date : 'N/A'}
//             </p>
//           </div>
//         </div>
//       ) : (
//         // No Tracking Available
//         <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
//           <Package className="mx-auto text-gray-300 mb-4" size={64} />
//           <h3 className="text-2xl font-bold text-gray-600 mb-2">
//             No Tracking Information Yet
//           </h3>
//           <p className="text-gray-500 mb-6">
//             Tracking updates will appear here once your order is processed by our team
//           </p>
//           <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 max-w-md mx-auto">
//             <p className="text-sm text-blue-800">
//               <strong>💡 What happens next:</strong>
//             </p>
//             <ul className="text-sm text-blue-700 mt-2 text-left space-y-1">
//               <li>• Your order is currently being reviewed</li>
//               <li>• Once approved, production will begin</li>
//               <li>• You'll receive updates at each stage</li>
//               <li>• Check back regularly for new updates</li>
//             </ul>
//           </div>
//         </div>
//       )}


//     </div>
//   );
// };

// export default TrackOrder;