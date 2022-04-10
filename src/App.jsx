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
  RegisterPage,
  PrivatePage,
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
          <Route path="/register" element={<RegisterPage />} />
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
