import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  LandingPage,
  LoginPage,
  PrivatePage,
  ResetPasswordPage,
  ProjectsPage,
} from './pages';

import { PrivateRoute } from './components';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/reset" element={<ResetPasswordPage />} />
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
