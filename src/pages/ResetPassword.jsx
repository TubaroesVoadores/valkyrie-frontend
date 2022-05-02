import React, { useState } from 'react';

import { useForm } from '@mantine/form';

import { Link } from 'react-router-dom';

import '../styles/ResetPassword.scss';

import {
  Button,
  Text,
  TextInput,
  Box,
  Anchor,
  Center,
  Title,
} from '@mantine/core';

import Fundo from '../assets/fundo.svg';

export const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const resetPasswordForm = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'E-mail inválido'),
    },
  });

  return (
    <div className="resetPasswordPage__wrapper">
      <div className="resetPasswordPage__formContainer">
        <Box sx={{ maxWidth: 340 }} mx="auto">
          <Title order={2} className="resetPasswordPage__formTitle">Esqueceu a senha?</Title>
          <Text size="md">Informe o seu e-mail e enviaremos um link para redefinir sua senha.</Text>
          <form onSubmit={resetPasswordForm.onSubmit(() => setIsLoading(true))}>
            <TextInput
              required
              label="Seu e-mail"
              placeholder="exemplo@mail.com"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...resetPasswordForm.getInputProps('email')}
              className="resetPasswordPage__loginForm"
            />
            <div className="resetPasswordPage__backToLogin">
              <Anchor
                component={Link}
                to="/login"
                align="right"
                size="sm"
                color="green"
              >
                Voltar para o login
              </Anchor>
            </div>
            <Center position="right" mt="md" fullWidth>
              <Button size="lg" fullWidth type="submit" loading={isLoading} color="green">Entrar</Button>
            </Center>
          </form>
        </Box>
      </div>
      <div className="resetPasswordPage__imageContainer">
        <img src={Fundo} alt="fundo" />
      </div>
    </div>
  );
};
