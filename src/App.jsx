import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  LandingPage,
  LoginPage,
  ResetPassword,
  ProjectsPage,
  ProjectPage,
} from './pages';

import { PrivateRoute, RedirectRoute } from './components';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={(
          <RedirectRoute>
            <LoginPage />
          </RedirectRoute>
        )}
      />
      <Route
        path="/login/reset"
        element={(
          <RedirectRoute>
            <ResetPassword />
          </RedirectRoute>
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
      <Route
        path="/projects/:projectId"
        element={(
          <PrivateRoute>
            <ProjectPage />
          </PrivateRoute>
        )}
      />
    </Routes>
  </BrowserRouter>
);
