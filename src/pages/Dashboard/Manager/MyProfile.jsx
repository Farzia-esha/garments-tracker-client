import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import Loading from '../../../Components/Shared/Loading';

const MyProfile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    approvedOrders: 0,
    totalRevenue: 0,
    totalStock: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3000/users/${user.email}`)
        .then(res => {
          if (!res.ok) throw new Error('User not found');
          return res.text();
        })
        .then(text => {
          if (text) {
            const data = JSON.parse(text);
            setUserData(data);
            fetchManagerStats();
          }
          setLoading(false);
        })
    }
  }, [user]);

  const fetchManagerStats = async () => {
    try {
      const productsRes = await fetch('http://localhost:3000/products');
      const allProducts = await productsRes.json();
      const myProducts = allProducts.filter(p => p.createdBy === user.email);

      const ordersRes = await fetch('http://localhost:3000/bookings');
      const allOrders = await ordersRes.json();

      const totalProducts = myProducts.length;
      const totalStock = myProducts.reduce((sum, p) => sum + p.quantity, 0);
      const pendingOrders = allOrders.filter(o => o.orderStatus === 'pending').length;
      const approvedOrders = allOrders.filter(o => o.orderStatus === 'approved').length;
      const totalOrders = pendingOrders + approvedOrders;
      const totalRevenue = allOrders
        .filter(o => o.orderStatus === 'approved' || o.orderStatus === 'delivered')
        .reduce((sum, o) => sum + o.totalPrice, 0);

      setStats({
        totalProducts,
        totalOrders,
        pendingOrders,
        approvedOrders,
        totalRevenue,
        totalStock
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = async () => {
    await logOut();
    navigate('/');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) { return ( <div><Loading></Loading></div> ); }

  return (
    <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Manager Profile</h2>
      {/* Suspend Alert */}
      {userData?.status === 'suspended' && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-800 mb-2">
                Account Suspended
              </h3>
              <p className="text-red-700 mb-3">
                Your manager account has been suspended. You cannot add products or approve orders.
              </p>
              {userData.suspendFeedback && (
                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Message from Admin:</p>
                  <p className="text-gray-800">{userData.suspendFeedback}</p>
                </div>
              )}
              {userData.suspendedAt && (
                <p className="text-sm text-red-600 mt-3">
                  Suspended on: {formatDate(userData.suspendedAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="w-32 h-32 rounded-full mx-auto"
                />
                <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 border-white ${
                  userData?.status === 'approved' ? 'bg-green-500' :
                  userData?.status === 'suspended' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-1"> {user?.displayName} </h3>
              
              <div className="inline-flex items-center bg-blue-200 px-4 py-2 rounded-full mb-4">
                Manager
              </div>

              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                userData?.status === 'suspended'? 'bg-red-200' 
                  : userData?.status === 'pending'? 'bg-yellow-200'
                  : 'bg-green-200'
              }`}>
                {userData?.status === 'suspended' 
                  ? 'Suspended' 
                  : userData?.status === 'pending'
                  ? 'Pending Approval'
                  : 'Active'}
              </div>

              {userData?.createdAt && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-4">
                  <span>Member since {formatDate(userData.createdAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Account Info Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h4 className="text-xl mb-6">
              Account Information
            </h4>

            <div className="space-y-6">
              <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                <div className="flex-1 font-semibold text-gray-800 text-lg">
                  <p className="text-sm text-gray-600 mb-1">Full Name</p>
                  <p> {user?.displayName} </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                <div className="flex-1 font-semibold text-gray-800 text-lg">
                  <p className="text-sm text-gray-600 mb-1">Email Address</p>
                  <p > {user?.email} </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                <div className="flex-1 font-semibold text-gray-800 text-lg">
                  <p className="text-sm text-gray-600 mb-1">Account Role</p>
                  <p >Manager</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-1 font-semibold text-gray-800 text-lg ">
                  <p className="text-sm text-gray-600 mb-1">Account Status</p>
                  <p>
                    {userData?.status || 'Active'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Products</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Stock</p>
              <p className="text-3xl font-bold text-green-600">{stats.totalStock}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Orders</p>
              <p className="text-3xl font-bold text-blue-600">{stats.pendingOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Approved Orders</p>
              <p className="text-3xl font-bold text-green-600">{stats.approvedOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-indigo-600">
                BDT {stats.totalRevenue}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* quick links */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-sm font-semibold text-gray-800">
        <h4 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/dashboard/add-product"
            className="flex flex-col items-center justify-center p-4 bg-blue-200 rounded-xl hover:bg-blue-300 transition-all"
          > Add Product </a>
          <a
            href="/dashboard/manage-products"
            className="flex flex-col items-center justify-center p-4 bg-green-200 rounded-xl hover:bg-green-300 transition-all"
          > Manage Products</a>
          <a
            href="/dashboard/pending-orders"
            className="flex flex-col items-center justify-center p-4 bg-yellow-200 rounded-xl hover:bg-yellow-300 transition-all"
          > Pending Orders </a>
          <a
            href="/dashboard/approved-orders"
            className="flex flex-col items-center justify-center p-4 bg-purple-200 rounded-xl hover:bg-purple-300 transition-all"
          > Approved Orders </a>
        </div>
      </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg"
        > Logout from Account
        </button>
    </div>
  );
};

export default MyProfile;