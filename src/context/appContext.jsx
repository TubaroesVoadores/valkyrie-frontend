/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useContext, createContext, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useEffect } from 'react/cjs/react.production.min';

export const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logIn = (callback) => {
    setIsAuthenticated(true);
    callback();
  };

  const logOut = (callback) => {
    setIsAuthenticated(false);
    callback();
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        logIn,
        logOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
