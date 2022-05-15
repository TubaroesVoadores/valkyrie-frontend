/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useQuery } from 'react-query';
import {
  Title,
  Button,
  SimpleGrid,
  useMantineTheme,
  Center,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useModals } from '@mantine/modals';

import { axiosClient } from '../lib';
import { WithHeader, ProjectCard } from '../components';
import { useProjectsStyles } from '../styles';

const Projects = () => {
  const theme = useMantineTheme();
  const modals = useModals();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const { classes } = useProjectsStyles();

  const { data: projects, status } = useQuery('projects', async () => {
    const response = await axiosClient.get('projects');

    return response.data;
  });

  const handleNewProject = () => {
    modals.openContextModal('NewProject', {
      title: 'Criar novo projeto',
      centered: true,
    });
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
          (status !== 'loading') ? (
            <SimpleGrid
              cols={5}
              spacing="lg"
              breakpoints={[
                { maxWidth: theme.breakpoints.xl, cols: 4 },
                { maxWidth: theme.breakpoints.md, cols: 3 },
                { maxWidth: theme.breakpoints.sm, cols: 2 },
                { maxWidth: theme.breakpoints.xs, cols: 1 },
              ]}
            >
              {
                projects?.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))
              }
            </SimpleGrid>
          ) : (
            <Center>Nenhum projeto encontrado</Center>
          )
        }
      </div>
    </div>
  );
};

export const ProjectsPage = WithHeader(Projects);
