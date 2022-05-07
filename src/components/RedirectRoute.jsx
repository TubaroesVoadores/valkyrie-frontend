import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

// eslint-disable-next-line react/prop-types
export const RedirectRoute = ({ children, route }) => {
  const location = useLocation();
  const { isAuthenticated } = useAppContext();

  return !isAuthenticated ? children : <Navigate to={`/${route}`} state={{ from: location }} replace />;
};
