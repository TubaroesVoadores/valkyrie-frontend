import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppContext } from '../context/appContext';

// eslint-disable-next-line react/prop-types
export const RedirectRoute = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useAppContext();

  return !currentUser ? children : <Navigate to="/projects" state={{ from: location }} replace />;
};
