import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Menu, X, Home, Package, ShoppingCart, Users, Settings, LogOut, LayoutDashboard, Plus, CheckCircle, Clock } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Logo from '../Components/Logo/Logo';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logOut } = useAuth();
  const { userRole, loading } = useUserRole();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate('/');
  };

  const getMenuItems = () => {
    const role = userRole || 'buyer';
    if (role === 'admin') {
      return [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <Users size={20} />, label: 'Manage Users', path: '/dashboard/manage-users' },
        { icon: <Package size={20} />, label: 'All Products', path: '/dashboard/all-products' },
        { icon: <ShoppingCart size={20} />, label: 'All Orders', path: '/dashboard/all-orders' },
      ];
    } else if (role === 'manager') {
      return [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <Plus size={20} />, label: 'Add Product', path: '/dashboard/add-product' },
        { icon: <Package size={20} />, label: 'Manage Products', path: '/dashboard/manage-products' },
        { icon: <Clock size={20} />, label: 'Pending Orders', path: '/dashboard/pending-orders' },
        { icon: <CheckCircle size={20} />, label: 'Approved Orders', path: '/dashboard/approved-orders' },
      ];
    } else {
      return [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <ShoppingCart size={20} />, label: 'My Orders', path: '/dashboard/my-orders' },
      ];
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  const menuItems = getMenuItems();

  return (
    <div className="flex h-screen bg-gray-100">
        {/* sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-800 to-indigo-800 text-white transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10">
            <Logo />
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200"
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-white">
            <a
              href="/dashboard/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 mb-2"
            >
              <span className="font-medium">My Profile</span>
            </a>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    {/* main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-gray-600"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Home Link */}
              <a
                href="/"
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                <Home size={20} />
                <span className="hidden md:inline">Home</span>
              </a>
              
              <div className="flex items-center gap-3">
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="w-10 h-10 rounded-full border-2 border-indigo-200"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-800">{user?.displayName}</p>
                  <p className="text-xs text-gray-500 capitalize">{userRole || 'buyer'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;