/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useContext, createContext, useState } from 'react';

export const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
