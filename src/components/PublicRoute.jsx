import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  console.log('PublicRoute → Authenticated:', isAuthenticated);
  console.log('PublicRoute → Location:', location.pathname);

  if (isAuthenticated && location.pathname !== '/dashboard') {
    // If already authenticated and not on dashboard, redirect
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
