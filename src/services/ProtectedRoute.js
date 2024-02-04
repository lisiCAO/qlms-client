import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ role }) => {
  const { user } = useAuth();

  if (!user) {

    return <Navigate to="/auth" replace />;

  } else if (user.role !== role) {
    const redirectTo = user.role === 'tenant' ? '/tenant' : '/landlord';
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
