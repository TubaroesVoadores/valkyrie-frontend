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

      setCurrentUser({
        name: userName,
        email: userEmail,
      });
      setLoading(false);
    } catch (error) {
      setCurrentUser(null);
      setLoading(false);
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
        withNewPassword();
        setLoading(false);
      }

      const {
        attributes: {
          name: userName,
          email: userEmail,
        },
      } = response;

      setCurrentUser({
        name: userName,
        email: userEmail,
      });
      setLoading(false);

      withLogin();
    } catch (error) {
      setCurrentUser(null);
      setLoading(false);
      throw error;
    }
  };

  const logOut = async () => {
    await Auth.signOut();
    setCurrentUser(null);
    setLoading(false);
  };

  const resetPassword = async ({ email }) => {
    const response = await Auth.forgotPassword(email);
    console.log(response);
  };

  const resetPasswordSubmit = async ({ email, code, password }) => {
    const response = await Auth.forgotPasswordSubmit(email, code, password);
    console.log(response);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loading,
        checkAuth,
        logIn,
        logOut,
        resetPassword,
        resetPasswordSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
