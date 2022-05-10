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

      setLoading(false);
      setCurrentUser({
        name: userName,
        email: userEmail,
      });
    } catch (error) {
      setLoading(false);
      setCurrentUser(null);
      throw error;
    }
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

      setLoading(false);
      setCurrentUser({
        name: userName,
        email: userEmail,
      });

      callback();
    } catch (error) {
      setLoading(false);
      setCurrentUser(null);
      throw error;
    }
  };

  const logOut = async () => {
    await Auth.signOut();
    setLoading(false);
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
