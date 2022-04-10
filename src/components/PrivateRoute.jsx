import { React } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../lib/contextLib';

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAppContext();

  return isAuthenticated ? children : <Navigate to="/" />;
};
