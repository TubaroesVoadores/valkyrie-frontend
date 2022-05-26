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
  Image,
} from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';

import { useLandingStyles } from '../styles';
import Landing from '../assets/landing.svg';

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
      <div className={classes.contentWrapper}>
        <div style={classes.textWrapper}>
          <Title style={{ fontSize: '4rem' }}>Valkyrie</Title>
          <Text
            align="center"
            component="p"
            size="md"
            style={{ width: 400, textAlign: 'justify' }}
          >
            Solução inteligente para latifúndios com o objetivo de sensoriar a
            presente área de vegetação nativa na Amazônia.
          </Text>
          <div
            style={{
              width: 106,
              marginTop: 18,
              display: 'flex',
              gap: '1rem',
            }}
          >
            <Button
              onClick={() => navigate('/login')}
              size="md"
              type="button"
              color="green"
            >
              Acessar a plataforma
            </Button>
            <Button
              onClick={scrollIntoView}
              size="md"
              type="button"
              color="green"
            >
              Entre em contato
            </Button>
          </div>
        </div>
        <div className={classes.imageWrapper}>
          <Image src={Landing} alt="fundo" />
        </div>
      </div>
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
