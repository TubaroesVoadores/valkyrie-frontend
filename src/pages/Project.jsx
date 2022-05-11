import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Title,
  Button,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { axiosClient } from '../lib';
import { WithHeader } from '../components';
import { useProjectsStyles } from '../styles';

const Project = () => {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const location = useLocation();
  const { classes } = useProjectsStyles();

  console.log(location);

  const { data: project, status } = useQuery('project', async () => {
    const response = await axiosClient.get('projects/1');

    return response.data;
  });

  console.log(project, status);

  const handleDownloadPDF = () => {};

  return (
    <div className={classes.wrapper}>
      <div className={classes.heading}>
        <Title>Projeto numero</Title>
        <Button
          variant="filled"
          color="white"
          onClick={handleDownloadPDF}
          size={matches ? 'md' : 'sm'}
        >
          Novo Projeto
        </Button>
      </div>
    </div>
  );
};

export const ProjectPage = WithHeader(Project);
