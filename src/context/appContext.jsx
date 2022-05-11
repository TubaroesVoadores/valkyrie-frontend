/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
} from 'react';
import { Auth } from 'aws-amplify';

export const AppContext = createContext(null);

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

  const logIn = async ({ email, password }, withLogin, withNewPassword) => {
    setLoading(true);

    try {
      const response = await Auth.signIn(email, password);

      if (response.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setLoading(false);
        withNewPassword();
      }

      const {
        attributes: {
          name: userName,
          email: userEmail,
        },
      } = response;

      setLoading(false);
      setCurrentUser({
        name: userName,
        email: userEmail,
      });

      withLogin();
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

export const useAppContext = () => useContext(AppContext);
