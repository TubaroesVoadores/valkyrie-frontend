import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';

import { useAppContext } from '../context/appContext';

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { currentUser, loading } = useAppContext();

  if (loading) {
    return (
      <Center sx={{ height: '100vh' }}>
        <Loader color="green" />
      </Center>
    );
  }

  return currentUser ? children : <Navigate to="/login" state={{ from: location }} replace />;
};
