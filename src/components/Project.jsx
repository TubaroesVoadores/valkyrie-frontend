/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'react-feather';
import { Text, ActionIcon } from '@mantine/core';

import { useProjectStyles } from '../styles';

export const Project = (props) => {
  const {
    id,
    name,
    cidade,
    status,
  } = props;

  const navigate = useNavigate();
  const { classes } = useProjectStyles();

  const handleClick = () => {
    navigate(`/projects/${id}`);
  };

  return (
    <div className={classes.wrapper}>
      <Text className={classes.title}>{name}</Text>
      <div className={classes.detailsSection}>
        <div className={classes.details}>
          <Text className={classes.detailsTitle}>CIDADE</Text>
          <Text size="sm">{cidade}</Text>
        </div>
        <div className={classes.details}>
          <Text className={classes.detailsTitle}>STATUS</Text>
          <Text size="sm">{status}</Text>
        </div>
      </div>
      <ActionIcon
        className={classes.icon}
        size="lg"
        variant="filled"
        color="green"
        onClick={handleClick}
      >
        <ArrowUpRight size={20} />
      </ActionIcon>
    </div>
  );
};
