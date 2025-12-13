// import React, { useState } from 'react';
// import { Menu, X, User, LogOut, LayoutDashboard, Home, Package, Mail, Info } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Logo from '../Logo/Logo';
// import useAuth from '../../hooks/useAuth';
// import { NavLink } from 'react-router';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleMenu = () => setIsOpen(!isOpen);
//   const { user, logOut } = useAuth();
//   const isLoggedIn = !!user;

//   // Before Login Links
//   const beforeLoginLinks = [
//     { name: 'Home', path: '/', icon: <Home size={18} /> },
//     { name: 'All Product', path: '/all-products', icon: <Package size={18} /> },
//     { name: 'About Us', path: '/about', icon: <Info size={18} /> },
//     { name: 'Contact', path: '/contact', icon: <Mail size={18} /> }
//   ];

//   // After Login Links
//   const afterLoginLinks = [
//     { name: 'Home', path: '/', icon: <Home size={18} /> },
//     { name: 'All Product', path: '/all-products', icon: <Package size={18} /> },
//     { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> }
//   ];

//   const navLinks = isLoggedIn ? afterLoginLinks : beforeLoginLinks;

//   const handleLogout = async () => {
//     await logOut();
//   };

//   return (
//     <nav className="bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-600 shadow-lg sticky top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">

//           {/* Left: Logo */}
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center cursor-pointer"
//           >
//             <Logo />
//           </motion.div>

//           {/* Desktop Menu */}
//           <div className="hidden lg:flex items-center space-x-1">
//             {navLinks.map((link, index) => (
//               <motion.a
//                 key={link.name}
//                 href={link.path}
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-all duration-300 font-medium flex items-center gap-2"
//               >
//                 {link.icon}
//                 {link.name}
//               </motion.a>
//             ))}

//             {/* Before Login */}
//             {!isLoggedIn && (
//               <>
//                 <NavLink to="/login"
//                   className="px-5 py-2 text-white border-2 border-white rounded-lg hover:bg-white hover:text-indigo-600 transition font-semibold ml-2"
//                 >
//                   Login
//                 </NavLink>

//                 <NavLink to="/register"
//                   className="px-5 py-2 bg-white text-indigo-600 rounded-lg hover:bg-yellow-300 transition font-bold shadow-lg"
//                 >
//                   Register
//                 </NavLink>
//               </>
//             )}

//             {/* After Login */}
//             {isLoggedIn && (
//               <div className="flex items-center space-x-3 ml-4">

//                 <div className="dropdown dropdown-end">
//                   <motion.div 
//                     tabIndex={0} 
//                     whileHover={{ scale: 1.1 }}
//                     className="avatar cursor-pointer"
//                   >
//                     <div className="w-11 h-11 rounded-full ring ring-white ring-offset-2 ring-offset-purple-600">
//                       <img src={user?.photoURL} alt="avatar" />
//                     </div>
//                   </motion.div>

//                   <ul tabIndex={0} className="dropdown-content menu p-3 shadow-2xl bg-white rounded-xl w-64 mt-3">
//                     <li className="px-4 py-3 border-b border-gray-200">
//                       <div className="flex items-center gap-3">
//                         <img src={user?.photoURL} className="w-12 h-12 rounded-full" />
//                         <div>
//                           <span className="font-bold text-gray-800">{user?.displayName}</span>
//                           <span className="text-xs text-gray-500">{user?.email}</span>
//                         </div>
//                       </div>
//                     </li>

//                     <li>
//                       <NavLink to="/dashboard" className="flex items-center gap-2 hover:bg-indigo-50 py-2 text-gray-700">
//                         <User size={18} />
//                         My Profile
//                       </NavLink>
//                     </li>
//                   </ul>
//                 </div>

//                 {/* Logout */}
//                 <button
//                   onClick={handleLogout}
//                   className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-semibold flex items-center gap-2 shadow-lg"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Mobile Hamburger */}
//           <div className="lg:hidden flex items-center">
//             <button onClick={toggleMenu} className="text-white">
//               {isOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="lg:hidden pb-4"
//             >
//               <div className="flex flex-col space-y-2">
//                 {navLinks.map((link) => (
//                   <a
//                     key={link.name}
//                     href={link.path}
//                     className="text-white hover:bg-white/20 px-4 py-3 rounded-lg flex items-center gap-2 font-medium"
//                   >
//                     {link.icon}
//                     {link.name}
//                   </a>
//                 ))}

//                 {/* Before Login Mobile */}
//                 {!isLoggedIn && (
//                   <>
//                     <NavLink to="/login" className="text-white px-4 py-3 border-2 border-white rounded-lg text-center">
//                       Login
//                     </NavLink>
//                     <NavLink to="/register" className="bg-white text-indigo-600 px-4 py-3 rounded-lg font-bold text-center">
//                       Register
//                     </NavLink>
//                   </>
//                 )}

//                 {/* After Login Mobile */}
//                 {isLoggedIn && (
//                   <div className="px-4 py-3 bg-white/10 rounded-lg">
//                     <div className="flex items-center space-x-3 mb-3">
//                       <img src={user?.photoURL} className="w-12 h-12 rounded-full ring ring-white" />
//                       <div>
//                         <p className="text-white font-bold">{user?.displayName}</p>
//                         <p className="text-white/70 text-xs">{user?.email}</p>
//                       </div>
//                     </div>

//                     <NavLink to="/dashboard/profile" className="flex items-center gap-2 text-white mb-2">
//                       <User size={18} /> My Profile
//                     </NavLink>

//                     <button
//                       onClick={handleLogout}
//                       className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
//                     >
//                       <LogOut size={18} /> Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// src/Components/Shared/Navbar.jsx
import React, { useState } from 'react';
import { Menu, X, User, LogOut, LayoutDashboard, Home, Package, Mail, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../Logo/Logo';
import useAuth from '../../hooks/useAuth';
import useUserRole from '../../hooks/useUserRole';
import { NavLink } from 'react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { user, logOut } = useAuth();
  const { userRole } = useUserRole();
  const isLoggedIn = !!user;

  // Get role-based dashboard link
  const getDashboardLink = () => {
    if (userRole === 'admin') return '/dashboard/manage-users';
    if (userRole === 'manager') return '/dashboard/add-product';
    return '/dashboard/my-orders';
  };

  const getProfileLink = () => {
    if (userRole === 'admin') return '/dashboard/manage-users';
    if (userRole === 'manager') return '/dashboard/profile';
    return '/dashboard/profile';
  };

  // Before Login Links
  const beforeLoginLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'All Product', path: '/all-products', icon: <Package size={18} /> },
    { name: 'About Us', path: '/about', icon: <Info size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={18} /> }
  ];

  // After Login Links
  const afterLoginLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'All Product', path: '/all-products', icon: <Package size={18} /> },
    { name: 'Dashboard', path: getDashboardLink(), icon: <LayoutDashboard size={18} /> }
  ];

  const navLinks = isLoggedIn ? afterLoginLinks : beforeLoginLinks;

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Left: Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center cursor-pointer"
          >
            <NavLink to="/">
              <Logo />
            </NavLink>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center gap-2 ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'text-white hover:bg-white/10'
                    }`
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              </motion.div>
            ))}

            {/* Before Login */}
            {!isLoggedIn && (
              <>
                <NavLink 
                  to="/login"
                  className="px-5 py-2 text-white border-2 border-white rounded-lg hover:bg-white hover:text-indigo-600 transition font-semibold ml-2"
                >
                  Login
                </NavLink>

                <NavLink 
                  to="/register"
                  className="px-5 py-2 bg-white text-indigo-600 rounded-lg hover:bg-yellow-300 transition font-bold shadow-lg"
                >
                  Register
                </NavLink>
              </>
            )}

            {/* After Login */}
            {isLoggedIn && (
              <div className="flex items-center space-x-3 ml-4">
                <div className="dropdown dropdown-end">
                  <motion.div 
                    tabIndex={0} 
                    whileHover={{ scale: 1.1 }}
                    className="avatar cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-full ring ring-white ring-offset-2 ring-offset-purple-600">
                      <img src={user?.photoURL || 'https://i.pravatar.cc/150'} alt="avatar" />
                    </div>
                  </motion.div>

                  <ul tabIndex={0} className="dropdown-content menu p-3 shadow-2xl bg-white rounded-xl w-64 mt-3">
                    <li className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center gap-3 pointer-events-none">
                        <img src={user?.photoURL || 'https://i.pravatar.cc/150'} className="w-12 h-12 rounded-full" alt="profile" />
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800 block">{user?.displayName}</span>
                          <span className="text-xs text-gray-500 block">{user?.email}</span>
                          {userRole && (
                            <span className="text-xs font-semibold text-indigo-600 capitalize mt-1">
                              {userRole}
                            </span>
                          )}
                        </div>
                      </div>
                    </li>

                    <li>
                      <NavLink 
                        to={getProfileLink()} 
                        className="flex items-center gap-2 hover:bg-indigo-50 py-2 text-gray-700"
                      >
                        <User size={18} />
                        My Profile
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-semibold flex items-center gap-2 shadow-lg"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-4"
            >
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg flex items-center gap-2 font-medium ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white hover:bg-white/10'
                      }`
                    }
                  >
                    {link.icon}
                    {link.name}
                  </NavLink>
                ))}

                {/* Before Login Mobile */}
                {!isLoggedIn && (
                  <>
                    <NavLink 
                      to="/login" 
                      onClick={() => setIsOpen(false)}
                      className="text-white px-4 py-3 border-2 border-white rounded-lg text-center"
                    >
                      Login
                    </NavLink>
                    <NavLink 
                      to="/register" 
                      onClick={() => setIsOpen(false)}
                      className="bg-white text-indigo-600 px-4 py-3 rounded-lg font-bold text-center"
                    >
                      Register
                    </NavLink>
                  </>
                )}

                {/* After Login Mobile */}
                {isLoggedIn && (
                  <div className="px-4 py-3 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <img src={user?.photoURL || 'https://i.pravatar.cc/150'} className="w-12 h-12 rounded-full ring ring-white" alt="profile" />
                      <div>
                        <p className="text-white font-bold">{user?.displayName}</p>
                        <p className="text-white/70 text-xs">{user?.email}</p>
                        {userRole && (
                          <p className="text-yellow-300 text-xs font-semibold capitalize mt-1">
                            {userRole}
                          </p>
                        )}
                      </div>
                    </div>

                    <NavLink 
                      to={getProfileLink()} 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-white mb-2 hover:bg-white/10 px-2 py-2 rounded"
                    >
                      <User size={18} /> My Profile
                    </NavLink>

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <LogOut size={18} /> Logout
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