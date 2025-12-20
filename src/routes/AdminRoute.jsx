// // AdminRoute.jsx
// import React from "react";
// import { Navigate, useLocation } from "react-router";
// import useAuth from "../hooks/useAuth";
// import useUserRole from "../hooks/useUserRole";

// const AdminRoute = ({ children }) => {
//   const { user, loading } = useAuth();
//   const { role } = useUserRole(user?.email);
//   const location = useLocation();

//   if (loading) return <p>Loading...</p>;

//   if (user && role === "admin") {
//     return children;
//   }

//   return <Navigate to="/" state={{ from: location }} replace />;
// };

// export default AdminRoute;


// AdminRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole(user?.email);
  const location = useLocation();

  if (authLoading || roleLoading) return <p>Loading...</p>;

  if (user && role === "admin") return children;

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;

