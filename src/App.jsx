import {
  React,
  useState,
  useMemo,
} from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import {
  LandingPage,
  LoginPage,
  PrivatePage,
  ResetPasswordPage,
} from './pages';

import {
  PrivateRoute,
} from './components';
import { AppContext } from './lib/contextLib';

function App() {
  const [isAuthenticated, setIsAuthenticaded] = useState(false);
  const authenticated = useMemo(() => ({ isAuthenticated, setIsAuthenticaded }), [isAuthenticated]);

  return (
    <BrowserRouter>
      <AppContext.Provider value={authenticated}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/reset" element={<ResetPasswordPage />} />
          <Route
            path="/private"
            element={(
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PrivatePage />
              </PrivateRoute>
            )}
          />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
