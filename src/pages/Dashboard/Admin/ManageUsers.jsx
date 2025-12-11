import React, { useEffect, useState } from 'react';
import { Users, Edit, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); 
  const [suspendReason, setSuspendReason] = useState('');
  const [suspendFeedback, setSuspendFeedback] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleOpenModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
    setShowModal(true);
    setSuspendReason('');
    setSuspendFeedback('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setModalType('');
    setSuspendReason('');
    setSuspendFeedback('');
  };

  const handleApprove = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`http://localhost:3000/users/${selectedUser.email}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'approved',
          suspendReason: null,
          suspendFeedback: null
        })
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'User Approved!',
          text: `${selectedUser.name} has been approved successfully`,
          timer: 2000,
          showConfirmButton: false
        });
        fetchUsers();
        handleCloseModal();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Could not approve user'
      });
    }
  };

  const handleSuspend = async () => {
    if (!selectedUser) return;

    // Validation
    if (!suspendReason.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Reason Required',
        text: 'Please provide a reason for suspension'
      });
      return;
    }

    if (!suspendFeedback.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Feedback Required',
        text: 'Please provide feedback for the user'
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/users/${selectedUser.email}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'suspended',
          suspendReason: suspendReason,
          suspendFeedback: suspendFeedback,
          suspendedAt: new Date()
        })
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'User Suspended!',
          text: `${selectedUser.name} has been suspended`,
          timer: 2000,
          showConfirmButton: false
        });
        fetchUsers();
        handleCloseModal();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Could not suspend user'
      });
    }
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: 'bg-purple-100 text-purple-800',
      manager: 'bg-blue-100 text-blue-800',
      buyer: 'bg-green-100 text-green-800',
    };
    return styles[role?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      suspended: 'bg-red-100 text-red-800',
    };
    return styles[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Manage Users</h2>
        <p className="text-gray-600">Approve or suspend user accounts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-800">{users.length}</p>
            </div>
            <Users className="text-indigo-600" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Buyers</p>
              <p className="text-3xl font-bold text-green-600">
                {users.filter(u => u.role === 'buyer').length}
              </p>
            </div>
            <Users className="text-green-600" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Managers</p>
              <p className="text-3xl font-bold text-blue-600">
                {users.filter(u => u.role === 'manager').length}
              </p>
            </div>
            <Users className="text-blue-600" size={40} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Suspended</p>
              <p className="text-3xl font-bold text-red-600">
                {users.filter(u => u.status === 'suspended').length}
              </p>
            </div>
            <AlertCircle className="text-red-600" size={40} />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sky-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Photo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4">
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-800">{user.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(user.status)}`}>
                      {user.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {user.status !== 'approved' && (
                        <button
                          onClick={() => handleOpenModal(user, 'approve')}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all"
                          title="Approve User"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      {user.status !== 'suspended' && (
                        <button
                          onClick={() => handleOpenModal(user, 'suspend')}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                          title="Suspend User"
                        >
                          <XCircle size={18} />
                        </button>
                      )}
                      {user.status === 'suspended' && (
                        <button
                          onClick={() => handleOpenModal(user, 'approve')}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                          title="Unsuspend User"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {modalType === 'approve' ? 'Approve User' : 'Suspend User'}
            </h3>

            <div className="mb-4">
              <p className="text-sm text-gray-600">User Name</p>
              <p className="font-semibold text-gray-800">{selectedUser.name}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-800">{selectedUser.email}</p>
            </div>

            {modalType === 'suspend' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Reason for Suspension <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={suspendReason}
                    onChange={(e) => setSuspendReason(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none"
                    placeholder="Internal reason for admin records..."
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Feedback for User <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={suspendFeedback}
                    onChange={(e) => setSuspendFeedback(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none"
                    placeholder="Message that will be shown to the user..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    This message will be visible to the user on their profile
                  </p>
                </div>
              </>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={modalType === 'approve' ? handleApprove : handleSuspend}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${
                  modalType === 'approve'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {modalType === 'approve' ? 'Approve' : 'Suspend'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;