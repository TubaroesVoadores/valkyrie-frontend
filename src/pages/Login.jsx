/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  PasswordInput,
  TextInput,
  Box,
  Anchor,
  Center,
  Title,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';

import { useAppContext } from '../context/appContext';
import { useLoginStyles } from '../styles';
import Fundo from '../assets/fundo.svg';

const schema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string().min(8, 'Senha deve ter no mínimo 8 caracteres').required('Senha é obrigatória'),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const { logIn } = useAppContext();
  const { classes } = useLoginStyles();

  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm({
    schema: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleLogIn = async () => {
    setIsLoading(true);

    const { email, password } = loginForm.values;

    try {
      await logIn({ email, password }, () => {
        navigate('/projects');
      });
    } catch (error) {
      setIsLoading(false);
      loginForm.setErrors({
        email: 'E-mail ou senha inválidos',
        password: 'E-mail ou senha inválidos',
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.formWrapper}>
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <Title order={2}>Bem-vindo à Valkyrie.</Title>
          <form onSubmit={loginForm.onSubmit(handleLogIn)} className={classes.form}>
            <TextInput
              required
              label="Seu e-mail"
              placeholder="exemplo@mail.com"
              {...loginForm.getInputProps('email')}
            />
            <PasswordInput
              required
              label="Sua senha"
              placeholder="Digite sua senha"
              {...loginForm.getInputProps('password')}
            />
            <div>
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
            <Center
              position="right"
              mt="md"
              fullWidth
              sx={{ marginTop: '0.5rem' }}
            >
              <Button
                size="lg"
                fullWidth
                type="submit"
                loading={isLoading}
                color="green"
              >
                Entrar
              </Button>
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
