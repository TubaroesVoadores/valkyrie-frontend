/* eslint-disable react/prop-types */
import React from 'react';

import {
  Button,
  createStyles,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
}));

export const Project = (props) => {
  const {
    name,
    cidade,
    status,
  } = props;

  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <span>{name}</span>
    </div>
  );
};
