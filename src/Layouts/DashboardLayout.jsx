
import React, { useState } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router';
import {
  Menu, X, Home, Package, ShoppingCart, Users, LogOut,
  LayoutDashboard, Plus, CheckCircle, Clock, User, MapPin
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Logo from '../Components/Logo/Logo';
import Loading from '../Components/Shared/Loading';
import SmallFooter from '../Components/Shared/SmallFooter';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isManagerMenuOpen, setIsManagerMenuOpen] = useState(false); // collapsible manager menu
  const { user, logOut } = useAuth();
  const { userRole, loading } = useUserRole();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate('/');
  };

  const getMenuItems = () => {
    if (userRole === 'admin') {
      return [
        { icon: <Users size={20} />, label: 'Manage Users', path: '/dashboard/manage-users' },
        { icon: <Package size={20} />, label: 'All Products', path: '/dashboard/all-products' },
        { icon: <ShoppingCart size={20} />, label: 'All Orders', path: '/dashboard/all-orders' },
      ];
    } else if (userRole === 'manager') {
      return [
        { icon: <Plus size={20} />, label: 'Add Product', path: '/dashboard/add-product' },
        { icon: <Package size={20} />, label: 'Manage Products', path: '/dashboard/manage-products' },
        { icon: <Clock size={20} />, label: 'Pending Orders', path: '/dashboard/pending-orders' },
        { icon: <CheckCircle size={20} />, label: 'Approved Orders', path: '/dashboard/approved-orders' },
      ];
    } else {
      return [
        { icon: <ShoppingCart size={20} />, label: 'My Orders', path: '/dashboard/my-orders' },
        { icon: <MapPin size={20} />, label: 'Track Orders', path: '/dashboard/track-orders' },
      ];
    }
  };

  if (loading) return <Loading />;

  const menuItems = getMenuItems();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-800 to-indigo-900 text-white transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <NavLink to="/" onClick={() => setIsSidebarOpen(false)}>
              <Logo />
            </NavLink>
            <p className="text-sm text-gray-300 mt-2 capitalize">
              {userRole ? `${userRole} Dashboard` : 'Dashboard'}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive ? 'bg-white/20 text-white font-semibold' : 'hover:bg-white/10'
                      }`
                    }
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}

              {/* Admin collapsible manager menu */}
              {userRole === 'admin' && (
                <li>
                  <button
                    onClick={() => setIsManagerMenuOpen(!isManagerMenuOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <LayoutDashboard size={20} />
                      <span className="font-medium">Manager Pages</span>
                    </div>
                    <span>{isManagerMenuOpen ? '−' : '+'}</span>
                  </button>

                  {isManagerMenuOpen && (
                    <ul className="mt-2 ml-8 space-y-1">
                      <li>
                        <NavLink
                          to="/dashboard/add-product"
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                              isActive ? 'bg-white/20 text-white font-semibold' : 'hover:bg-white/10'
                            }`
                          }
                        >
                          <Plus size={18} />
                          <span className="font-medium">Add Product</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/pending-orders"
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                              isActive ? 'bg-white/20 text-white font-semibold' : 'hover:bg-white/10'
                            }`
                          }
                        >
                          <Clock size={18} />
                          <span className="font-medium">Pending Orders</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/approved-orders"
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                              isActive ? 'bg-white/20 text-white font-semibold' : 'hover:bg-white/10'
                            }`
                          }
                        >
                          <CheckCircle size={18} />
                          <span className="font-medium">Approved Orders</span>
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </nav>

          {/* Bottom profile & logout */}
          <div className="p-4 border-t border-white/10">
            <NavLink
              to="/dashboard/profile"
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mb-2 ${
                  isActive ? 'bg-white/20 text-white font-semibold' : 'hover:bg-white/10'
                }`
              }
            >
              <User size={20} />
              <span className="font-medium">My Profile</span>
            </NavLink>

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

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-900"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
              <NavLink
                to="/"
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition"
              >
                <Home size={20} />
                <span className="hidden md:inline">Home</span>
              </NavLink>

              <NavLink
                to="/all-products"
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition"
              >
                <Package size={20} />
                <span className="hidden md:inline">All Products</span>
              </NavLink>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <img
                  src={user?.photoURL || 'https://i.pravatar.cc/150'}
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

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>

        <SmallFooter />
      </div>
    </div>
  );
};

export default DashboardLayout;
