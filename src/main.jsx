import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';

import { App } from './App';
import { queryClient } from './lib';
import { AppContextProvider } from './context/appContext';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
