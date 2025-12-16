// import React, { useEffect, useState } from 'react';
// import Swal from 'sweetalert2';
// import { UserCheck, UserX, Search, Edit } from 'lucide-react';

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     filterUsers();
//   }, [searchTerm, statusFilter, users]);

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
//       const data = await res.json();
//       setUsers(data);
//       setFilteredUsers(data);
//     } catch (err) {
//       console.error(err);
//       Swal.fire('Error', 'Failed to fetch users', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterUsers = () => {
//     let filtered = users;
//     if (searchTerm) {
//       filtered = filtered.filter(user => 
//         user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (statusFilter !== 'all') {
//       filtered = filtered.filter(user => user.status === statusFilter);
//     }
//     setFilteredUsers(filtered);
//   };

//   const handleStatusChange = async (userEmail, currentStatus) => {
//     const newStatus = currentStatus === 'approved' ? 'suspended' : 'approved';
//     if (newStatus === 'suspended') {
//       const { value: reason } = await Swal.fire({
//         title: 'Suspend User',
//         input: 'textarea',
//         inputLabel: 'Suspension Reason',
//         inputPlaceholder: 'Enter reason for suspension...',
//         showCancelButton: true,
//         confirmButtonText: 'Suspend',
//         confirmButtonColor: '#d33',
//         inputValidator: (value) => {
//           if (!value) {
//             return 'You must provide a reason!';
//           }
//         }
//       });
//       if (!reason) return;

//       await updateUserStatus(userEmail, newStatus, reason);
//     } else {
//       await updateUserStatus(userEmail, newStatus);
//     }
//   };

//   const updateUserStatus = async (userEmail, status, suspendReason = '') => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userEmail}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status, suspendReason })
//       });

//       if (response.ok) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Status Updated!',
//           showConfirmButton: false,
//           timer: 1500
//         });
//         fetchUsers();
//       }
//     } catch (error) {
//       Swal.fire('Error', 'Failed to update status', 'error');
//     }
//   };

//   const handleRoleChange = async (userEmail, currentRole) => {
//     const { value: newRole } = await Swal.fire({
//       title: 'Change User Role',
//       input: 'select',
//       inputOptions: {
//         buyer: 'Buyer',
//         manager: 'Manager',
//         admin: 'Admin'
//       },
//       inputValue: currentRole,
//       showCancelButton: true,
//       confirmButtonText: 'Update Role'
//     });

//     if (newRole && newRole !== currentRole) {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userEmail}`, {
//           method: 'PATCH',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ role: newRole })
//         });

//         if (response.ok) {
//           Swal.fire('Success!', 'Role updated successfully', 'success');
//           fetchUsers();
//         }
//       } catch (error) {
//         Swal.fire('Error', 'Failed to update role', 'error');
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-96">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h1>
//       {/* search */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search by name or email..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//           />
//         </div>
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//           className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//         >
//           <option value="all">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="approved">Approved</option>
//           <option value="suspended">Suspended</option>
//         </select>
//       </div>

//       {/* Users Count */}
//       <p className="text-sm text-gray-600 mb-4">
//         Showing {filteredUsers.length} of {users.length} users
//       </p>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-blue-200">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
//               <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {filteredUsers.map(user => (
//               <tr key={user._id} className="hover:bg-gray-50 transition">
//                 <td className="px-4 py-3">
//                   <div className="flex items-center gap-3">
//                     <img 
//                       src={user.photoURL || 'https://i.pravatar.cc/150'} 
//                       alt={user.name} 
//                       className="w-10 h-10 rounded-full border-2 border-gray-200" 
//                     />
//                     <span className="font-semibold text-gray-800">{user.name}</span>
//                   </div>
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
//                 <td className="px-4 py-3">
//                   <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                     user.role === 'admin' ? 'bg-red-100 text-red-700' :
//                     user.role === 'manager' ? 'bg-blue-100 text-blue-700' :
//                     'bg-green-100 text-green-700'
//                   }`}>
//                     {user.role}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3">
//                   <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                     user.status === 'approved' ? 'bg-green-100 text-green-700' :
//                     user.status === 'suspended' ? 'bg-red-100 text-red-700' :
//                     'bg-yellow-100 text-yellow-700'
//                   }`}>
//                     {user.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3">
//                   <div className="flex justify-center gap-2">
//                     <button
//                       onClick={() => handleRoleChange(user.email, user.role)}
//                       className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
//                       title="Change Role"
//                     >
//                       <Edit size={18} />
//                     </button>
//                     <button
//                       onClick={() => handleStatusChange(user.email, user.status)}
//                       className={`p-2 rounded-lg transition flex items-center gap-1 ${
//                         user.status === 'approved' 
//                           ? 'bg-red-100 text-red-600 hover:bg-red-200' 
//                           : 'bg-green-100 text-green-600 hover:bg-green-200'
//                       }`}
//                       title={user.status === 'approved' ? 'Suspend' : 'Approve'}
//                     >
//                       {user.status === 'approved' ? <UserX size={18} /> : <UserCheck size={18} />}
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {filteredUsers.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">No users found</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { UserCheck, UserX, Search, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import Loading from '../../../Components/Shared/Loading';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, statusFilter, roleFilter, users]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;
    
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }
    
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleStatusChange = async (userEmail, currentStatus) => {
    const newStatus = currentStatus === 'approved' ? 'suspended' : 'approved';
    
    if (newStatus === 'suspended') {
      const { value: formValues } = await Swal.fire({
        title: 'Suspend User',
        html: `
          <div class="text-left space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Suspension Reason *</label>
              <textarea 
                id="suspend-reason" 
                class="w-full p-2 border rounded" 
                rows="3"
                placeholder="Enter reason for suspension..."
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Feedback Message *</label>
              <textarea 
                id="suspend-feedback" 
                class="w-full p-2 border rounded" 
                rows="3"
                placeholder="Message to show the user..."
              ></textarea>
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Suspend User',
        confirmButtonColor: '#d33',
        preConfirm: () => {
          const reason = document.getElementById('suspend-reason').value;
          const feedback = document.getElementById('suspend-feedback').value;
          
          if (!reason || !feedback) {
            Swal.showValidationMessage('Both fields are required!');
            return false;
          }
          
          return { reason, feedback };
        }
      });
      
      if (!formValues) return;
      await updateUserStatus(userEmail, newStatus, formValues.reason, formValues.feedback);
    } else {
      await updateUserStatus(userEmail, newStatus);
    }
  };

  const updateUserStatus = async (userEmail, status, suspendReason = '', suspendFeedback = '') => {
    try {
      const updateData = { 
        status,
        suspendReason: status === 'suspended' ? suspendReason : '',
        suspendFeedback: status === 'suspended' ? suspendFeedback : '',
        suspendedAt: status === 'suspended' ? new Date() : null
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userEmail}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: `User ${status === 'suspended' ? 'Suspended' : 'Approved'}!`,
          showConfirmButton: false,
          timer: 1500
        });
        fetchUsers();
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  const handleRoleChange = async (userEmail, currentRole) => {
    const { value: newRole } = await Swal.fire({
      title: 'Change User Role',
      input: 'select',
      inputOptions: {
        buyer: 'Buyer',
        manager: 'Manager',
        admin: 'Admin'
      },
      inputValue: currentRole,
      showCancelButton: true,
      confirmButtonText: 'Update Role'
    });

    if (newRole && newRole !== currentRole) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userEmail}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: newRole })
        });

        if (response.ok) {
          Swal.fire('Success!', 'Role updated successfully', 'success');
          fetchUsers();
        }
      } catch (error) {
        Swal.fire('Error', 'Failed to update role', 'error');
      }
    }
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Loading />;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="suspended">Suspended</option>
        </select>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Roles</option>
          <option value="buyer">Buyer</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Stats */}
      <p className="text-sm text-gray-600 mb-4">
        Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
      </p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-blue-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentUsers.map(user => (
              <tr key={user._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={user.photoURL || 'https://i.pravatar.cc/150'} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full border-2 border-gray-200" 
                    />
                    <span className="font-semibold text-gray-800">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'admin' ? 'bg-red-100 text-red-700' :
                    user.role === 'manager' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.status === 'approved' ? 'bg-green-100 text-green-700' :
                    user.status === 'suspended' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleRoleChange(user.email, user.role)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                      title="Change Role"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleStatusChange(user.email, user.status)}
                      className={`p-2 rounded-lg transition ${
                        user.status === 'approved' 
                          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                      title={user.status === 'approved' ? 'Suspend' : 'Approve'}
                    >
                      {user.status === 'approved' ? <UserX size={18} /> : <UserCheck size={18} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {currentUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No users found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                currentPage === index + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
          
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;