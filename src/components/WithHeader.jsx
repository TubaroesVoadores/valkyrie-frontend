/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Header } from './Header';

export const WithHeader = (Component) => ({ ...props }) => (
  <>
    <Header />
    <Component {...props} />
  </>
);
