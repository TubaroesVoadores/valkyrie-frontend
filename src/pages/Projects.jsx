/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  Title, Button, useMantineTheme, Loader, Center,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import { API } from 'aws-amplify';

import { WithHeader, ProjectsList, NewProjectSheet } from '../components';
import { useProjectsStyles } from '../styles';

const Projects = () => {
  const theme = useMantineTheme();
  const modals = useModals();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const { classes } = useProjectsStyles();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: projects, status } = useQuery('projects', async () => {
    const response = await API.get('projects', '/projects');

    return response.projects;
  });

  const handleNewProject = () => {
    if (!matches) {
      modals.openContextModal('NewProject', {
        title: 'Criar novo projeto',
        centered: true,
      });
    } else {
      setIsSheetOpen(true);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.heading}>
        <Title>Seus Projetos</Title>
        <Button
          variant="filled"
          color="white"
          onClick={handleNewProject}
          size={matches ? 'md' : 'sm'}
        >
          Novo Projeto
        </Button>
      </div>
      <div className={classes.projectsList}>
        {
          status === 'loading' && (
            <Center sx={{ marginTop: '1rem' }}>
              <Loader />
            </Center>
          )
        }
        {
          status === 'success' && projects.length > 0 && (
            <ProjectsList projects={projects} />
          )
        }
      </div>
      <NewProjectSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </div>
  );
};

export const ProjectsPage = WithHeader(Projects);
