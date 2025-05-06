// src/components/ResetCodeProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ResetCodeProtectedRoute = ({ children }) => {
  const verified = localStorage.getItem('resetCodeVerified'); // set this only after successful verification

  return verified === 'true' ? children : <Navigate to="/verify-code" replace />;
};

export default ResetCodeProtectedRoute;
