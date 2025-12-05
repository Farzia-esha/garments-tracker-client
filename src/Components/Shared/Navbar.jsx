import React, { useState } from 'react';
import { Menu, X, ShoppingBag, User, LogOut, LayoutDashboard, Home, Package, Mail, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockUser = {
  name: "mr.x",
  email: "mr@example.com",
  photoURL: "https://i.pravatar.cc/150?img=12",
  role: "buyer"
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);
  
  // Before Login
  const beforeLoginLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'All Products', path: '/all-products', icon: <Package size={18} /> },
    { name: 'About Us', path: '/about', icon: <Info size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={18} /> }
  ];

  //After Login
  const afterLoginLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'All Products', path: '/all-products', icon: <Package size={18} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> }
  ];

  const navLinks = isLoggedIn ? afterLoginLinks : beforeLoginLinks;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Side*/}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <ShoppingBag className="text-white" size={32} />
            <span className="text-4xl font-bold text-white">Garment<span className='text-yellow-400 text-xl py-2'>Track</span></span>
          </motion.div>

          {/* (Desktop) */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300 font-medium flex items-center gap-2"
              >
                {link.icon}
                {link.name}
              </motion.a>
            ))}

            {/* Before Login: Login & Register Buttons */}
            {!isLoggedIn && (
              <>
                <motion.a
                  href="/login"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 text-white border-2 border-white rounded-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 font-semibold ml-2"
                >
                  Login
                </motion.a>
                <motion.a
                  href="/register"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 bg-white text-indigo-600 rounded-lg hover:bg-yellow-300 transition-all duration-300 font-bold shadow-lg"
                >
                  Register
                </motion.a>
              </>
            )}

            {/* After Login: User Avatar & Logout */}
            {isLoggedIn && (
              <div className="flex items-center space-x-3 ml-4">
                <div className="dropdown dropdown-end">
                  <motion.div 
                    tabIndex={0} 
                    whileHover={{ scale: 1.1 }}
                    className="avatar cursor-pointer"
                    title={mockUser.name}
                  >
                    <div className="w-11 h-11 rounded-full ring ring-white ring-offset-2 ring-offset-purple-600">
                      <img src={mockUser.photoURL} alt={mockUser.name} />
                    </div>
                  </motion.div>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-3 shadow-2xl bg-white rounded-xl w-64 mt-3">
                    <li className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <img src={mockUser.photoURL} alt={mockUser.name} className="w-12 h-12 rounded-full" />
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800">{mockUser.name}</span>
                          <span className="text-xs text-gray-500">{mockUser.email}</span>
                          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded mt-1 w-fit capitalize font-semibold">
                            {mockUser.role}
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <a href="/dashboard/profile" className="flex items-center gap-2 hover:bg-indigo-50 text-gray-700 py-2">
                        <User size={18} />
                        My Profile
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Logout Button */}
                <motion.button
                  onClick={toggleLogin}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 font-semibold flex items-center gap-2 shadow-lg"
                >
                  <LogOut size={18} />
                  Logout
                </motion.button>
              </div>
            )}

            {/* Demo Toggle */}
            <button
              onClick={toggleLogin}
              className="ml-2 px-3 py-1 text-xs bg-yellow-400 text-gray-800 rounded-full font-bold hover:bg-yellow-300 shadow-md"
            >
              {isLoggedIn ? 'after' : 'before'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-4"
            >
              <div className="flex flex-col space-y-2">
                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path}
                    className="text-white hover:bg-white/20 px-4 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium"
                  >
                    {link.icon}
                    {link.name}
                  </a>
                ))}
                
                {/* Before Login - Mobile */}
                {!isLoggedIn && (
                  <>
                    <a href="/login" className="text-white hover:bg-white/20 px-4 py-3 rounded-lg font-semibold border-2 border-white text-center">
                      Login
                    </a>
                    <a href="/register" className="bg-white text-indigo-600 px-4 py-3 rounded-lg font-bold text-center shadow-lg">
                      Register
                    </a>
                  </>
                )}
                
                {/* After Login - Mobile */}
                {isLoggedIn && (
                  <div className="px-4 py-3 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <img src={mockUser.photoURL} alt={mockUser.name} className="w-12 h-12 rounded-full ring ring-white" />
                      <div>
                        <p className="text-white font-bold">{mockUser.name}</p>
                        <p className="text-white/70 text-xs">{mockUser.email}</p>
                        <span className="text-xs bg-white text-indigo-600 px-2 py-1 rounded mt-1 inline-block capitalize font-semibold">
                          {mockUser.role}
                        </span>
                      </div>
                    </div>
                    <a href="/dashboard/profile" className="flex items-center gap-2 text-white hover:text-yellow-300 mb-2 py-2">
                      <User size={18} />
                      My Profile
                    </a>
                    <button 
                      onClick={toggleLogin}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

