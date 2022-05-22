/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  useContext,
  createContext,
  useState,
  useEffect,
} from 'react';
import { Auth } from 'aws-amplify';

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    setLoading(true);

    try {
      const response = await Auth.currentAuthenticatedUser();

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
    } catch (error) {
      setCurrentUser(null);
      setLoading(false);
      throw error;
    }
  };

  const logIn = async ({ email, password, newPassword = null }, redirectAfterLogin) => {
    setLoading(true);

    try {
      const response = await Auth.signIn(email, password);

      if (response.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setLoading(false);
        if (!newPassword) throw new Error(response.challengeName);

        const newPasswordResponse = await Auth.completeNewPassword(response, newPassword);

        const {
          challengeParam: {
            userAttributes: {
              name: userName,
              email: userEmail,
            },
          },
        } = newPasswordResponse;

        setCurrentUser({
          name: userName,
          email: userEmail,
        });
      } else {
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
      }

      setLoading(false);

      redirectAfterLogin();
    } catch (error) {
      setCurrentUser(null);
      setLoading(false);
      throw error;
    }
  };

  const logOut = async () => {
    await Auth.signOut({ global: true });
    setCurrentUser(null);
    setLoading(false);
  };

  const resetPassword = async ({ email }) => {
    await Auth.forgotPassword(email);
  };

  const resetPasswordSubmit = async ({ email, code, password }, withSuccess) => {
    await Auth.forgotPasswordSubmit(email, code, password);
    withSuccess();
  };

  useEffect(() => checkAuth(), []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loading,
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
