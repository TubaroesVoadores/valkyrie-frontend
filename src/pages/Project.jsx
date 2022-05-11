/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Title,
  Button,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { axiosClient } from '../lib';
import { WithHeader } from '../components';
import { useProjectStyles } from '../styles';

const Project = () => {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const { projectId } = useParams();
  const { classes } = useProjectStyles();

  const { data: project, status } = useQuery('project', async () => {
    const response = await axiosClient.get(`projects/${projectId}`);

    return response.data;
  });

  const handleDownloadPDF = () => {};

  return (
    <div className={classes.wrapper}>
      <div className={classes.heading}>
        <Title>
          Projeto {projectId}
        </Title>
        <Button
          variant="filled"
          color="white"
          onClick={handleDownloadPDF}
          size={matches ? 'md' : 'sm'}
        >
          Baixar PDF
        </Button>
      </div>
      <div className={classes.projectInfos}>
        {
          (status !== 'loading') && (
            <div>
              {
                Object.keys(project).map((key) => (
                  <div key={key}>
                    <span>{`${key}: ${project[key]}`}</span>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  );
};

export const ProjectPage = WithHeader(Project);
