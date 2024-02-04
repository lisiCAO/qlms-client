import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CheckAuth = () => {
  const { user, isAuthInitialized } = useAuth();
  if (!isAuthInitialized) {
    return null; // 或者 <LoadingIndicator />
  }
  console.log('User:', user);
  console.log('User role:', user?.role);
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const redirectTo = user.role === 'tenant' ? '/tenant/' : '/landlord/';
  return <Navigate to={redirectTo} replace />;
};

export default CheckAuth;
