import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';

import {
  useForm,
  yupResolver,
} from '@mantine/form';

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

import { useLandingStyles } from '../styles';

import Landing from '../assets/landing.svg';

const formSchema = Yup.object().shape({
  name: Yup.string().min(4, 'Seu nome deve conter no minimo 4 caracteres').required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido'),
  description: Yup.string().min(10, 'Sua mensagem deve contar no minimo 10 caracteres')
    .required('Mensagem é obrigatorio'),
});

export const LandingPage = () => {
  const { classes } = useLandingStyles();
  const navigate = useNavigate();
  const viewport = useRef();

  const executeScroll = () => viewport.current.scrollIntoView({ behavior: 'smooth' });

  const [isLoading, setIsLoading] = useState(false);

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

    try {
      await API.post('projects', '/projects/landingEmail', {
        body: {
          name,
          email,
          description,
        },
      });
    } catch (error) {
      console.log(error);
    }
    landingForm.reset();
    setIsLoading(false);
  };

  return (
    <>
      <div className={classes.contentWrapper}>
        <div style={classes.textWrapper}>
          <Title style={{ fontSize: 70 }}>valkyrie</Title>
          <Text align="center" component="p" size="md" style={{ width: 400, textAlign: 'justify' }}>
            Solução inteligente para latifúndios com o
            objetivo de sensoriar a presente área de vegetação
            nativa na Amazônia.
          </Text>
          <div style={{ width: 106, marginTop: 18, display: 'flex' }}>
            <Button
              onClick={() => navigate('/login')}
              size="md"
              type="submit"
              color="green"
              style={{ marginRight: 10 }}
            >
              Acessar a plataforma
            </Button>
            <Button
              size="md"
              type="submit"
              color="green"
              onClick={executeScroll}
            >
              Entre em contato
            </Button>
          </div>
        </div>
        <div className={classes.imageWrapper}>
          <Image
            src={Landing}
            alt="fundo"
          />
        </div>
      </div>
      <div className={classes.formWrapper} ref={viewport}>
        <form onSubmit={landingForm.onSubmit(sendEmail)} className={classes.form}>
          <Paper withBorder shadow="md" p={30} mt={200} radius="md">
            <TextInput
              label="Nome"
              placeholder="Seu nome"
              required
            // eslint-disable-next-line react/jsx-props-no-spreading
              {...landingForm.getInputProps('name')}
            />
            <TextInput
              label="Email"
              placeholder="email@exemplo.com"
              required
              mt="md"
            // eslint-disable-next-line react/jsx-props-no-spreading
              {...landingForm.getInputProps('email')}
            />
            <Textarea
              placeholder="Digite aqui sua mensagem"
              label="Sua mensagem"
              required
            // eslint-disable-next-line react/jsx-props-no-spreading
              {...landingForm.getInputProps('description')}
            />
            <Button mt="md" type="submit" loading={isLoading}>
              {isLoading ? 'Enviando email' : 'Enviar email'}
            </Button>
          </Paper>
        </form>
      </div>
    </>
  );
};
