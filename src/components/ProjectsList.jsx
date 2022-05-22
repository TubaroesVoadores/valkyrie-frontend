/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { SimpleGrid, useMantineTheme } from '@mantine/core';

import { ProjectCard } from './ProjectCard';

export const ProjectsList = ({ projects }) => {
  const theme = useMantineTheme();

  return (
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
        projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))
      }
    </SimpleGrid>
  );
};
