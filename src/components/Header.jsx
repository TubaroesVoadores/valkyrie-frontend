import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'react-feather';

import {
  Button,
  Anchor,
  Title,
} from '@mantine/core';

import { useAppContext } from '../context/appContext';
import { useHeaderStyles } from '../styles';

export const Header = () => {
  const navigate = useNavigate();

  const { logOut } = useAppContext();
  const { classes } = useHeaderStyles();

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
