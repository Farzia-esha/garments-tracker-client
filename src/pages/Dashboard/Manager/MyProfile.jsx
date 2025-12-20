
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

    fetch(`https://garments-tracker-system.vercel.app/users/${user.email}`)
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
