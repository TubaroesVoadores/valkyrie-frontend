import React, { useState } from 'react';

import { useForm } from '@mantine/form';

import { Link, useNavigate } from 'react-router-dom';

import '../styles/Login.scss';

import { Auth } from 'aws-amplify';

import {
  Button,
  PasswordInput,
  TextInput,
  Box,
  Anchor,
  Center,
  Title,
} from '@mantine/core';

import { useLoginStyles } from '../styles';

import { useAppContext } from '../context/appContext';

import Fundo from '../assets/fundo.svg';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { logIn } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const { classes } = useLoginStyles();

  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'E-mail inválido'),
    },
  });

  const handleLogIn = () => {
    logIn(async () => {
      // eslint-disable-next-line no-restricted-globals
      event.preventDefault();

      setIsLoading(true);
      try {
        await Auth.signIn(loginForm.values.email, loginForm.values.password);
        navigate('/projects');
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.formWrapper}>
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <Title order={2}>Bem-vindo à Valkyrie.</Title>
          <form onSubmit={loginForm.onSubmit(handleLogIn)}>
            <TextInput
              required
              label="Seu e-mail"
              placeholder="exemplo@mail.com"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...loginForm.getInputProps('email')}
              className="loginPage__loginForm"
            />
            <PasswordInput
              required
              label="Sua senha"
              placeholder="Digite sua senha"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...loginForm.getInputProps('password')}
              className="loginPage__passwordForm"
            />
            <div className="loginPage__forgetPasswordText">
              <Anchor
                component={Link}
                to="/login/reset"
                align="right"
                size="sm"
                color="green"
              >
                Esqueceu sua senha?
              </Anchor>
            </div>
            <Center position="right" mt="md" fullWidth>
              <Button size="lg" fullWidth type="submit" loading={isLoading} color="green">Entrar</Button>
            </Center>
          </form>
        </Box>
      </div>

      <div className={classes.imageWrapper}>
        <img src={Fundo} alt="fundo" />
      </div>
    </div>
  );
};
