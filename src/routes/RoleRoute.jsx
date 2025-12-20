// routes/RoleRoute.jsx
import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Shared/Loading';

const RoleRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;
