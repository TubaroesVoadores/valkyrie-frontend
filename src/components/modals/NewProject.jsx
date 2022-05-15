/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Button,
  Textarea,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';

import { useNewProjectStyles } from '../../styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  message: Yup.string().required('Mensagem é obrigatória'),
});

export const NewProject = () => {
  const { classes } = useNewProjectStyles();
  const [isLoading, setIsLoading] = useState(false);

  const newProjectForm = useForm({
    schema: yupResolver(schema),
    initialValues: {
      name: '',
      message: '',
    },
  });

  const handleNewProject = async () => {
    setIsLoading(true);
  };

  return (
    <div className={classes.wrapper}>
      <Text>
        Envie aqui sua mensagem
      </Text>
      <form onSubmit={newProjectForm.onSubmit(handleNewProject)} className={classes.form}>
        <TextInput
          required
          label="Nome"
          placeholder="Nome do projeto"
          {...newProjectForm.getInputProps('name')}
        />
        <Textarea
          required
          autosize
          label="Mensagem"
          placeholder="Digite sua mensagem"
          minRows={2}
          maxRows={5}
          {...newProjectForm.getInputProps('message')}
        />
        <Button
          fullWidth
          size="lg"
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
