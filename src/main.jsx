import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Amplify } from 'aws-amplify';

import config from './config';
import { App } from './App';
import { mantineTheme, queryClient, modals } from './lib';
import { AppContextProvider } from './context/appContext';

import './index.css';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: 'projects',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
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
