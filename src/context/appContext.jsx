/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
} from 'react';
import { Auth } from 'aws-amplify';

export const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    setLoading(true);

    try {
      const {
        attributes: {
          name: userName,
          email: userEmail,
        },
      } = await Auth.currentAuthenticatedUser();

      setCurrentUser({
        name: userName,
        email: userEmail,
      });
    } catch (error) {
      setCurrentUser(null);
      throw error;
    }

    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logIn = async ({ email, password }, callback) => {
    setLoading(true);

    try {
      const {
        attributes: {
          name: userName,
          email: userEmail,
        },
      } = await Auth.signIn(email, password);

      setCurrentUser({
        name: userName,
        email: userEmail,
      });

      callback();
    } catch (error) {
      setCurrentUser(null);
      throw error;
    }

    setLoading(false);
  };

  const logOut = async () => {
    await Auth.signOut();
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loading,
        checkAuth,
        logIn,
        logOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
