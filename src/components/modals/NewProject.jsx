/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { API } from 'aws-amplify';
import {
  Button, Textarea, Text, TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';

import { useNewProjectStyles } from '../../styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Mensagem é obrigatória'),
});

export const NewProject = () => {
  const { classes } = useNewProjectStyles();
  const [isLoading, setIsLoading] = useState(false);

  const newProjectForm = useForm({
    schema: yupResolver(schema),
    initialValues: {
      nameProject: '',
      description: '',
    },
  });

  const handleNewProject = async () => {
    const { nameProject, description } = newProjectForm.values;
    setIsLoading(true);

    await API.post('projects', '/projects/emailForms', {
      body: {
        nameProject,
        description,
      },
    });

    newProjectForm.reset();
    setIsLoading(false);
  };

  return (
    <div className={classes.wrapper}>
      <Text>Envie aqui sua solicitação de criação de projeto</Text>
      <form className={classes.form}>
        <TextInput
          required
          label="Nome do projeto"
          placeholder="Nome do projeto"
          {...newProjectForm.getInputProps('nameProject')}
        />
        <Textarea
          required
          autosize
          label="Descrição do projeto"
          placeholder="Digite a descrição do projeto"
          minRows={2}
          maxRows={5}
          {...newProjectForm.getInputProps('description')}
        />
        <Button
          fullWidth
          size="lg"
          onClick={handleNewProject}
          type="submit"
          color="green"
          loading={isLoading}
          sx={{ marginTop: '0.5rem' }}
        >
          Enviar
        </Button>
      </form>
    </div>
  );
};
