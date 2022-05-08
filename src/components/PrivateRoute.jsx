import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { currentUser, loading } = useAppContext();

  if (loading) {
    return null;
  }

  return currentUser ? children : <Navigate to="/login" state={{ from: location }} replace />;
};
