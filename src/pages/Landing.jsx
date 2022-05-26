/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { API } from 'aws-amplify';

import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import {
  TextInput,
  Paper,
  Title,
  Text,
  Button,
  Textarea,
} from '@mantine/core';

import { useScrollIntoView } from '@mantine/hooks';

import { Forest } from '../components';

import { useLandingStyles } from '../styles';

const formSchema = Yup.object().shape({
  name: Yup.string().min(4, 'Seu nome deve conter no mínimo 4 caracteres').required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido'),
  // eslint-disable-next-line max-len
  description: Yup.string().min(10, 'Sua mensagem deve contar no mínimo 10 caracteres').required('Mensagem é obrigatório'),
});

export const LandingPage = () => {
  const { classes } = useLandingStyles();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const { scrollIntoView, targetRef } = useScrollIntoView({ axis: 'y', offset: -300 });

  const landingForm = useForm({
    schema: yupResolver(formSchema),
    initialValues: {
      name: '',
      email: '',
      description: '',
    },
  });

  const sendEmail = async () => {
    const { name, email, description } = landingForm.values;
    setIsLoading(true);

    await API.post('projects', '/projects/landingEmail', {
      body: {
        name,
        email,
        description,
      },
    });

    landingForm.reset();
    setIsLoading(false);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.informationWrapper}>
          <Title className={classes.titleStyle}>Valkyrie</Title>
          <Text
            align="center"
            component="p"
            size="md"
            className={classes.description}
          >
            Solução inteligente para documentação de áreas de vegetação
            nativa de propriedades no território amazônico.
          </Text>
          <div className={classes.buttonsWrapper}>
            <Button
              onClick={() => navigate('/login')}
              style={{ width: '100%' }}
              size="md"
              type="button"
              color="green"
            >
              Acessar a plataforma
            </Button>
            <Button
              style={{ width: '100%' }}
              onClick={scrollIntoView}
              size="md"
              type="button"
              color="green"
            >
              Entre em contato
            </Button>
          </div>
        </div>
      </div>
      <Forest />
      <div className={classes.formWrapper} ref={targetRef}>
        <Paper withBorder shadow="md" p={24} radius="md" className={classes.form}>
          <form
            onSubmit={landingForm.onSubmit(sendEmail)}
          >
            <TextInput
              label="Nome"
              placeholder="Seu nome"
              required
              {...landingForm.getInputProps('name')}
            />
            <TextInput
              label="Email"
              placeholder="email@exemplo.com"
              required
              {...landingForm.getInputProps('email')}
            />
            <Textarea
              placeholder="Digite aqui sua mensagem"
              label="Sua mensagem"
              required
              autosize
              minRows={2}
              maxRows={5}
              {...landingForm.getInputProps('description')}
            />
            <Button type="submit" loading={isLoading} size="md">
              {isLoading ? 'Enviando email' : 'Enviar email'}
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
};
