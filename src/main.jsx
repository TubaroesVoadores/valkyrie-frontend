import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';

import { App } from './App';
import { mantineTheme, queryClient } from './lib';
import { AppContextProvider } from './context/appContext';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <MantineProvider theme={mantineTheme}>
          <App />
        </MantineProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
