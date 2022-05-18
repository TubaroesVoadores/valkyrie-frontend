import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'react-feather';

import {
  Button,
  Anchor,
  Title,
  Text,
} from '@mantine/core';

import { useAppContext } from '../context/appContext';
import { useHeaderStyles } from '../styles';

export const Header = () => {
  const { currentUser, logOut } = useAppContext();
  const { classes } = useHeaderStyles();

  const handleLogOut = () => {
    logOut();
  };

  return (
    <div className={classes.wrapper}>
      <Anchor
        className={classes.anchor}
        component={Link}
        to="/projects"
      >
        <Title order={2}>
          valkyrie
        </Title>
      </Anchor>
      <div className={classes.actions}>
        <Text size="sm">
          {currentUser.name}
        </Text>
        <Button
          className={classes.button}
          variant="subtle"
          rightIcon={<LogOut size={24} className={classes.icon} />}
          onClick={handleLogOut}
          compact
        >
          Sair
        </Button>
      </div>
    </div>
  );
};
