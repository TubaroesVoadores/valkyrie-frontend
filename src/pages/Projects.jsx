import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'react-feather';

import {
  Title,
  createStyles,
  Button,
} from '@mantine/core';

import {
  WithHeader,
  Project,
} from '../components';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: '3rem 12.5rem 0',
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      margin: '2rem 6.25rem 0',
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      margin: '1rem 2rem 0',
    },
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectsList: {
    display: 'grid',
    margin: '2rem 0',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridGap: '1rem',
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    },
  },
}));

const Projects = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  const [projects, setProjects] = React.useState([
    {
      id: 1,
      name: 'Project 1',
      cidade: 'Ananindeua',
      status: 'Criado',
    },
    {
      id: 2,
      name: 'Project 2',
      cidade: 'Ananindeua',
      status: 'Em analise',
    },
    {
      id: 3,
      name: 'Project 3',
      cidade: 'Ananindeua',
      status: 'Finalizado',
    },
    {
      id: 4,
      name: 'Project 4',
      cidade: 'Ananindeua',
      status: 'Criado',
    },
    {
      id: 5,
      name: 'Project 5',
      cidade: 'Ananindeua',
      status: 'Em analise',
    },
    {
      id: 6,
      name: 'Project 6',
      cidade: 'Ananindeua',
      status: 'Finalizado',
    },
    {
      id: 7,
      name: 'Project 7',
      cidade: 'Ananindeua',
      status: 'Criado',
    },
    {
      id: 8,
      name: 'Project 8',
      cidade: 'Ananindeua',
      status: 'Em analise',
    },
  ]);

  const handleNewProject = () => {
    console.log('new project');
  };

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
          projects.map((project) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <Project key={project.id} {...project} />
          ))
        }
      </div>
    </div>
  );
};

export const ProjectsPage = WithHeader(Projects);
