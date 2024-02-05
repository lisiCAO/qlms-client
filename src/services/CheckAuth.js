import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CheckAuth = () => {
  const { user, isAuthInitialized } = useAuth();
  if (!isAuthInitialized) {
    return null; //  <LoadingIndicator />
  }
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const redirectTo = user.role === 'tenant' ? '/tenant/' : '/landlord/';
  return <Navigate to={redirectTo} replace />;
};

export default CheckAuth;
