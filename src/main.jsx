import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Amplify } from 'aws-amplify';

import { App } from './App';
import { mantineTheme, queryClient, modals } from './lib';
import { AppContextProvider } from './context/appContext';

import './index.css';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: import.meta.env.VITE_REGION,
    userPoolId: import.meta.env.VITE_USER_POOL_ID,
    identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_APP_CLIENT_ID,
  },
  Storage: {
    region: import.meta.env.VITE_REGION,
    bucket: import.meta.env.VITE_BUCKET,
    identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: 'projects',
        endpoint: import.meta.env.VITE_ENDPOINT,
        region: import.meta.env.VITE_REGION,
      },
    ],
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <MantineProvider theme={mantineTheme}>
          <ModalsProvider modals={modals}>
            <App />
          </ModalsProvider>
        </MantineProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
