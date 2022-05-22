/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Title,
  Anchor,
  Loader,
  Center,
  Badge,
} from '@mantine/core';
import { API } from 'aws-amplify';

import { ProjectInfos, WithHeader } from '../components';
import { useProjectStyles } from '../styles';

const Project = () => {
  const { projectId } = useParams();
  const { classes } = useProjectStyles();

  const { data: project, status } = useQuery('project', async () => {
    const response = await API.get('projects', `/projects/${projectId}`);

    return response.project;
  });

  return (
    <div className={classes.wrapper}>
      <div className={classes.heading}>
        <div className={classes.breadcrumbs}>
          <Anchor
            component={Link}
            to="/projects"
            size="lg"
            color="green"
          >
            Projects
          </Anchor>
          <Title>
            {
              project ? project.name : 'Project'
            }
          </Title>
          {
            project && (
              <Badge color="green" radius="sm" size="md" variant="filled">
                {project.status}
              </Badge>
            )
          }
        </div>
      </div>
      <div className={classes.projectInfos}>
        {
          (status === 'loading') && (
            <Center sx={{ marginTop: '1rem' }}>
              <Loader />
            </Center>
          )
        }
        {
          (status === 'success' && project) && (
            <ProjectInfos project={project} />
          )
        }
      </div>
    </div>
  );
};

export const ProjectPage = WithHeader(Project);
