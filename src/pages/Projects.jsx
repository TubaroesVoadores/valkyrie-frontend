/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useQuery } from 'react-query';
import { Plus } from 'react-feather';
import {
  Title,
  Button,
  SimpleGrid,
  useMantineTheme,
  Center,
} from '@mantine/core';

import { axiosClient } from '../lib';
import { WithHeader, Project } from '../components';
import { useProjectsStyles } from '../styles';

const Projects = () => {
  const theme = useMantineTheme();
  const { classes } = useProjectsStyles();

  const { data: projects, status } = useQuery('projects', async () => {
    const response = await axiosClient.get('projects');

    return response.data;
  });

  const handleNewProject = () => {};

  return (
    <div className={classes.wrapper}>
      <div className={classes.heading}>
        <Title>Projects</Title>
        <Button
          variant="filled"
          color="white"
          leftIcon={<Plus size={24} />}
          onClick={handleNewProject}
        >
          Novo Projeto
        </Button>
      </div>
      <div className={classes.projectsList}>
        {
          status !== 'loading' ? (
            <SimpleGrid
              cols={5}
              spacing="lg"
              breakpoints={[
                { maxWidth: theme.breakpoints.xl, cols: 4 },
                { maxWidth: theme.breakpoints.md, cols: 3 },
                { maxWidth: theme.breakpoints.sm, cols: 1 },
              ]}
            >
              {
                projects?.map((project) => (
                  <Project key={project.id} {...project} />
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
