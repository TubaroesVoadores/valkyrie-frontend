import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'react-feather';

import {
  Button,
  Anchor,
  Title,
  createStyles,
} from '@mantine/core';

import { useAppContext } from '../context/appContext';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
    margin: '0 12.5rem',
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      margin: '0 6.25rem',
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      margin: '0 2rem',
    },
  },
  anchor: {
    color: theme.colors.dark[9],
    ':hover': {
      textDecoration: 'none',
    },
  },
  button: {
    color: theme.colors.gray[7],
    ':hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    color: theme.colors.green[9],
  },
}));

export const Header = () => {
  const navigate = useNavigate();

  const { logOut } = useAppContext();
  const { classes } = useStyles();

  const handleLogOut = () => {
    logOut(() => navigate('/login'));
  };

  return (
    <div className={classes.wrapper}>
      <Anchor
        className={classes.anchor}
        component={Link}
        to="/"
      >
        <Title order={2}>
          valkyrie
        </Title>
      </Anchor>
      <Button
        className={classes.button}
        variant="subtle"
        rightIcon={<LogOut size={24} className={classes.icon} />}
        onClick={handleLogOut}
      >
        Sair
      </Button>
    </div>
  );
};
