// import React, { useEffect, useState } from 'react';
// import useAuth from '../../../hooks/useAuth';
// import { useNavigate } from 'react-router';
// import Loading from '../../../Components/Shared/Loading';

// const MyProfile = () => {
//   const { user, logOut } = useAuth();
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       fetch(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
//         .then(res => {
//           if (!res.ok) throw new Error('User not found');
//           return res.text();
//         })
//         .then(text => {
//           if (text) {
//             const data = JSON.parse(text);
//             setUserData(data);
//             fetchManagerStats();
//           }
//           setLoading(false);
//         })
//     }
//   }, [user]);

//   const fetchManagerStats = async () => {
//     try {
//       const productsRes = await fetch(`${import.meta.env.VITE_API_URL}/products`);
//       const allProducts = await productsRes.json();
//       const myProducts = allProducts.filter(p => p.createdBy === user.email);

//       const ordersRes = await fetch(`${import.meta.env.VITE_API_URL}/bookings`);
//       const allOrders = await ordersRes.json();


//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const handleLogout = async () => {
//     await logOut();
//     navigate('/');
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   if (loading) { return ( <div><Loading></Loading></div> ); }

//   return (
//     <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">Manager Profile</h2>
//       {/* Suspend Alert */}
//       {userData?.status === 'suspended' && (
//         <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-6">
//           <div className="flex items-start gap-4">
//             <div className="flex-1">
//               <h3 className="text-lg font-bold text-red-800 mb-2">
//                 Account Suspended
//               </h3>
//               <p className="text-red-700 mb-3">
//                 Your manager account has been suspended. You cannot add products or approve orders.
//               </p>
//               {userData.suspendFeedback && (
//                 <div className="bg-white rounded-lg p-4 border border-red-200">
//                   <p className="text-sm font-semibold text-gray-700 mb-1">Message from Admin:</p>
//                   <p className="text-gray-800">{userData.suspendFeedback}</p>
//                 </div>
//               )}
//               {userData.suspendedAt && (
//                 <p className="text-sm text-red-600 mt-3">
//                   Suspended on: {formatDate(userData.suspendedAt)}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//         {/* Profile Card */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <div className="text-center">
//               <div className="relative inline-block mb-4">
//                 <img
//                   src={user?.photoURL}
//                   alt={user?.displayName}
//                   className="w-32 h-32 rounded-full mx-auto"
//                 />
//                 <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${
//                   userData?.status === 'approved' ? 'bg-green-500' :
//                   userData?.status === 'suspended' ? 'bg-red-500' : 'bg-yellow-500'
//                 }`}></div>
//               </div>

//               <h3 className="text-2xl font-bold text-gray-800 mb-1"> {user?.displayName} </h3>
              
//               <div className="inline-flex items-center bg-blue-200 px-4 py-2 rounded-full mb-4">
//                 Manager
//               </div>

//               <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
//                 userData?.status === 'suspended'? 'bg-red-200' 
//                   : userData?.status === 'pending'? 'bg-yellow-200'
//                   : 'bg-green-200'
//               }`}>
//                 {userData?.status === 'suspended' 
//                   ? 'Suspended' 
//                   : userData?.status === 'pending'
//                   ? 'Pending Approval'
//                   : 'Active'}
//               </div>

//               {userData?.createdAt && (
//                 <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-4">
//                   <span>Member since {formatDate(userData.createdAt)}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Account Info Card */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h4 className="text-xl mb-6">
//               Account Information
//             </h4>

//             <div className="space-y-6">
//               <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
//                 <div className="flex-1 font-semibold text-gray-800 text-lg">
//                   <p className="text-sm text-gray-600 mb-1">Full Name</p>
//                   <p> {user?.displayName} </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
//                 <div className="flex-1 font-semibold text-gray-800 text-lg">
//                   <p className="text-sm text-gray-600 mb-1">Email Address</p>
//                   <p > {user?.email} </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
//                 <div className="flex-1 font-semibold text-gray-800 text-lg">
//                   <p className="text-sm text-gray-600 mb-1">Account Role</p>
//                   <p >Manager</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4">
//                 <div className="flex-1 font-semibold text-gray-800 text-lg ">
//                   <p className="text-sm text-gray-600 mb-1">Account Status</p>
//                   <p>
//                     {userData?.status || 'Active'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg"
//         > Logout from Account
//         </button>
//     </div>
//   );
// };

// export default MyProfile;




// import React from 'react';

// import { User, Mail, Shield, AlertCircle, CheckCircle, Clock, XCircle, LogOut } from 'lucide-react';
// import { useNavigate } from 'react-router';
// import useAuth from '../../../hooks/useAuth';
// import useUserRole from '../../../hooks/useUserRole';

// const MyProfile = () => {
//   const { user, logOut } = useAuth();
//   const { userData, loading } = useUserRole();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logOut();
//     navigate('/login');
//   };

//   const getStatusIcon = () => {
//     if (userData?.status === 'approved') return <CheckCircle className="text-green-500" size={24} />;
//     if (userData?.status === 'suspended') return <XCircle className="text-red-500" size={24} />;
//     return <Clock className="text-yellow-500" size={24} />;
//   };

//   const getStatusColor = () => {
//     switch (userData?.status) {
//       case 'approved': return 'bg-green-100 text-green-700 border-green-300';
//       case 'suspended': return 'bg-red-100 text-red-700 border-red-300';
//       case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
//       default: return 'bg-gray-100 text-gray-700 border-gray-300';
//     }
//   };

//   const getRoleColor = () => {
//     switch (userData?.role) {
//       case 'admin': return 'bg-purple-100 text-purple-700';
//       case 'manager': return 'bg-blue-100 text-blue-700';
//       case 'buyer': return 'bg-green-100 text-green-700';
//       default: return 'bg-gray-100 text-gray-700';
//     }
//   };

//   const getRoleIcon = () => {
//     switch (userData?.role) {
//       case 'admin': return '👑';
//       case 'manager': return '📊';
//       case 'buyer': return '🛒';
//       default: return '👤';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-96">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">My Profile</h1>

//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        
//         {/* Header Section with Gradient */}
//         <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
//           <div className="flex flex-col md:flex-row items-center gap-6">
//             {/* Profile Picture */}
//             <div className="relative">
//               <img
//                 src={user?.photoURL || 'https://i.pravatar.cc/150'}
//                 alt={user?.displayName}
//                 className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
//               />
//               <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
//                 <span className="text-2xl">{getRoleIcon()}</span>
//               </div>
//             </div>

//             {/* User Info */}
//             <div className="text-center md:text-left flex-1">
//               <h2 className="text-3xl font-bold mb-2">{user?.displayName}</h2>
//               <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
//                 <Mail size={18} className="text-indigo-200" />
//                 <p className="text-indigo-100">{user?.email}</p>
//               </div>
//               <div className="flex gap-3 justify-center md:justify-start">
//                 <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getRoleColor()}`}>
//                   {userData?.role?.toUpperCase()}
//                 </span>
//                 <span className={`px-4 py-1 rounded-full text-sm font-semibold border-2 ${getStatusColor()}`}>
//                   {userData?.status?.toUpperCase()}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Body Section */}
//         <div className="p-8 space-y-6">
          
//           {/* Account Status Messages */}
//           {userData?.status === 'suspended' && userData?.suspendReason && (
//             <div className="border-2 border-red-300 bg-red-50 rounded-xl p-6 animate-pulse">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={28} />
//                 <div className="flex-1">
//                   <h3 className="text-xl font-bold text-red-800 mb-3">⚠️ Account Suspended</h3>
//                   <div className="bg-white border-2 border-red-200 rounded-lg p-4 mb-3">
//                     <p className="text-sm text-red-700 font-semibold mb-1">Reason for Suspension:</p>
//                     <p className="text-red-900 font-medium">{userData.suspendReason}</p>
//                   </div>
//                   <div className="bg-red-100 rounded-lg p-3">
//                     <p className="text-sm text-red-800">
//                       <strong>What this means:</strong>
//                     </p>
//                     <ul className="text-sm text-red-700 mt-2 space-y-1 ml-4">
//                       <li>• You cannot place new orders</li>
//                       {userData.role === 'manager' && <li>• You cannot add or manage products</li>}
//                       <li>• You can view your existing data</li>
//                       <li>• Contact support to resolve this issue</li>
//                     </ul>
//                   </div>
//                   <div className="mt-4 pt-4 border-t border-red-200">
//                     <p className="text-sm text-red-700">
//                       📧 <strong>Need help?</strong> Contact us at{' '}
//                       <a href="mailto:support@garmenttrack.com" className="underline font-semibold">
//                         support@garmenttrack.com
//                       </a>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {userData?.status === 'pending' && (
//             <div className="border-2 border-yellow-300 bg-yellow-50 rounded-xl p-6">
//               <div className="flex items-start gap-3">
//                 <Clock className="text-yellow-600 flex-shrink-0 mt-1" size={28} />
//                 <div>
//                   <h3 className="text-xl font-bold text-yellow-800 mb-2">⏳ Account Pending Approval</h3>
//                   <p className="text-yellow-700 mb-3">
//                     Your account is currently under review by our administrators.
//                   </p>
//                   <div className="bg-yellow-100 rounded-lg p-3">
//                     <p className="text-sm text-yellow-800">
//                       <strong>What happens next:</strong>
//                     </p>
//                     <ul className="text-sm text-yellow-700 mt-2 space-y-1 ml-4">
//                       <li>• Our team will review your account within 24-48 hours</li>
//                       <li>• You'll receive an email notification once approved</li>
//                       <li>• You can browse products but cannot place orders yet</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {userData?.status === 'approved' && (
//             <div className="border-2 border-green-300 bg-green-50 rounded-xl p-6">
//               <div className="flex items-start gap-3">
//                 <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={28} />
//                 <div>
//                   <h3 className="text-xl font-bold text-green-800 mb-2">✅ Account Active & Approved</h3>
//                   <p className="text-green-700">
//                     Your account is in good standing. You have full access to all features.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Account Information */}
//           <div className="border-2 border-gray-200 rounded-xl p-6">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
//               <User size={24} className="text-indigo-600" />
//               Account Information
//             </h3>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-sm text-gray-600 mb-1">Full Name</p>
//                   <p className="font-semibold text-gray-800">{user?.displayName}</p>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-sm text-gray-600 mb-1">Email Address</p>
//                   <p className="font-semibold text-gray-800">{user?.email}</p>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-sm text-gray-600 mb-1">Role</p>
//                   <div className="flex items-center gap-2">
//                     <span className="text-2xl">{getRoleIcon()}</span>
//                     <span className={`px-3 py-1 rounded-full text-sm font-bold ${getRoleColor()}`}>
//                       {userData?.role?.toUpperCase()}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 rounded-lg p-4">
//                   <p className="text-sm text-gray-600 mb-1">Account Status</p>
//                   <div className="flex items-center gap-2">
//                     {getStatusIcon()}
//                     <span className={`px-3 py-1 rounded-full text-sm font-bold border-2 ${getStatusColor()}`}>
//                       {userData?.status?.toUpperCase()}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gray-50 rounded-lg p-4">
//                 <p className="text-sm text-gray-600 mb-1">Member Since</p>
//                 <p className="font-semibold text-gray-800">
//                   {userData?.createdAt 
//                     ? new Date(userData.createdAt).toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })
//                     : 'N/A'
//                   }
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
//           >
//             <LogOut size={24} />
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyProfile;



import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import Loading from '../../../Components/Shared/Loading';

const MyProfile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const handleLogout = async () => {
    await logOut();
    navigate('/');
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  if (loading) return <Loading />;

  const role = userData?.role || 'user';
  const status = userData?.status || 'active';

  const roleTitle = {
    admin: 'Admin Profile',
    manager: 'Manager Profile',
    user: 'User Profile'
  }[role];

  const roleBadge = {
    admin: 'bg-purple-200 text-purple-800',
    manager: 'bg-blue-200 text-blue-800',
    user: 'bg-gray-200 text-gray-800'
  }[role];

  const statusBadge = status === 'suspended'
    ? 'bg-red-200 text-red-800'
    : status === 'pending'
    ? 'bg-yellow-200 text-yellow-800'
    : 'bg-green-200 text-green-800';

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">{roleTitle}</h2>

      {/* Suspended Alert */}
      {status === 'suspended' && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <h3 className="font-bold text-red-700">Account Suspended</h3>
          <p className="text-red-600">{userData?.suspendFeedback}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-bold">{user?.displayName}</h3>
          <p className="text-gray-600 mb-3">{user?.email}</p>

          <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${roleBadge}`}>
            {role.toUpperCase()}
          </span>

          <div className={`mt-3 inline-block px-4 py-2 rounded-full text-sm font-semibold ${statusBadge}`}>
            {status}
          </div>
        </div>

        {/* Info Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <h4 className="text-xl font-semibold mb-4">Account Information</h4>

          <div className="space-y-4">
            <Info label="Full Name" value={user?.displayName} />
            <Info label="Email" value={user?.email} />
            <Info label="Role" value={role} />
            <Info label="Status" value={status} />

            {role === 'manager' && (
              <Info label="Approval" value={status === 'approved' ? 'Approved' : 'Not Approved'} />
            )}

            {role === 'admin' && (
              <Info label="Access Level" value="Full System Access" />
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold"
      >
        Logout
      </button>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="border-b pb-3">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

export default MyProfile;
