import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  LandingPage,
  LoginPage,
  PrivatePage,
  ResetPassword,
  ProjectsPage,
} from './pages';

import { PrivateRoute, RedirectRoute } from './components';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/reset" element={<ResetPassword />} />
      <Route
        path="/private"
        element={(
          <PrivateRoute>
            <PrivatePage />
          </PrivateRoute>
        )}
      />
      <Route
        path="/projects"
        element={(
          <PrivateRoute>
            <ProjectsPage />
          </PrivateRoute>
        )}
      />
    </Routes>
  </BrowserRouter>
);
