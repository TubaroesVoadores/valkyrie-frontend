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

const schema = (withNewPassword) => Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string().min(8, 'Senha deve ter no mínimo 8 caracteres').required('Senha é obrigatória'),
  ...(withNewPassword && {
    newPassword: Yup.string().min(8, 'Senha deve ter no mínimo 8 caracteres').required('Senha é obrigatória'),
  }),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const { logIn } = useAppContext();
  const { classes } = useLoginStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [withNewPassword, setWithNewPassword] = useState(false);

  const loginForm = useForm({
    schema: yupResolver(schema(withNewPassword)),
    initialValues: {
      email: '',
      password: '',
      ...(withNewPassword && {
        newPassword: '',
      }),
    },
  });

  const handleLogIn = async () => {
    setIsLoading(true);

    const { email, password, newPassword } = loginForm.values;

    try {
      await logIn({ email, password, newPassword }, () => navigate('/projects'));
    } catch (error) {
      setIsLoading(false);

      if (error.message === 'NEW_PASSWORD_REQUIRED') {
        setWithNewPassword(true);
        loginForm.setErrors({
          newPassword: 'Precisa de uma nova senha',
        });
      } else {
        loginForm.setErrors({
          email: 'E-mail ou senha inválidos',
          password: 'E-mail ou senha inválidos',
          ...(withNewPassword && {
            newPassword: 'E-mail ou senha inválidos',
          }),
        });
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.formWrapper}>
        <Box sx={{ width: 340 }} mx="auto">
          <Title order={2}>Bem-vindo à Valkyrie.</Title>
          <form
            onSubmit={loginForm.onSubmit(handleLogIn)}
            className={classes.form}
          >
            <TextInput
              required
              label="Seu e-mail"
              placeholder="exemplo@mail.com"
              {...loginForm.getInputProps('email')}
            />
            <PasswordInput
              required
              label={!withNewPassword ? 'Sua senha' : 'Sua senha temporária'}
              placeholder={!withNewPassword ? 'Digite sua senha' : 'Digite sua senha temporária'}
              {...loginForm.getInputProps('password')}
            />
            {
              withNewPassword && (
                <PasswordInput
                  required
                  label="Sua nova senha"
                  placeholder="Digite sua nova senha"
                  {...loginForm.getInputProps('newPassword')}
                />
              )
            }
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
              sx={{
                marginTop: '0.5rem',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <Button
                fullWidth
                size="lg"
                type="submit"
                color="green"
                loading={isLoading}
              >
                Entrar
              </Button>
              <Button
                fullWidth
                color="green"
                variant="subtle"
                onClick={() => setWithNewPassword((state) => !state)}
              >
                {!withNewPassword ? 'Entrar com senha temporária' : 'Entrar com senha'}
              </Button>
            </Center>
          </form>
        </Box>
      </div>
      <div className={classes.imageWrapper}>
        <img src={Fundo} alt="fundo" />
      </div>
      <Anchor
        className={classes.link}
        component={Link}
        to="/"
        size="sm"
        color="green"
        underline
      >
        Voltar à pagina inicial
      </Anchor>
    </div>
  );
};
