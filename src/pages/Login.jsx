import React, { useState } from 'react';

import { useForm } from '@mantine/form';

import { Link } from 'react-router-dom';

import '../styles/Login.scss';

import {
  Button,
  PasswordInput,
  TextInput,
  Box,
  Anchor,
  Center,
  Title,
} from '@mantine/core';

import Fundo from '../assets/fundo.svg';

export const LoginPage = () => {
  // TODO: implementar context de autenticação
  // const {setIsAuthenticaded} ...
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'E-mail inválido'),
    },
  });

  return (
    <div className="loginPage__wrapper">
      <div className="loginPage__formContainer">
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <Title order={2} className="loginPage__formTitle">Bem-vindo à Valkyrie.</Title>
          <form onSubmit={loginForm.onSubmit(() => setIsLoading(true))}>
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
      <div className="loginPage__imageContainer">
        <img src={Fundo} alt="fundo" />
      </div>
    </div>
  );
};
