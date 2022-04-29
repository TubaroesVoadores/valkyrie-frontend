import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAppContext();

  return isAuthenticated ? children : <Navigate to="/" state={{ from: location }} replace />;
};
