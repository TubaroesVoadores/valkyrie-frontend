import React, { useState } from 'react';

import { useForm } from '@mantine/form';

import { Auth } from 'aws-amplify';

import { Link, Navigate } from 'react-router-dom';

import {
  Button,
  Text,
  TextInput,
  Box,
  Anchor,
  Center,
  Title,
  PasswordInput,
} from '@mantine/core';

import { useResetPasswordStyles } from '../styles/pages/ResetPassword';

import Fundo from '../assets/fundo.svg';

export const ResetPassword = () => {
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  const resetPasswordForm = useForm({
    initialValues: {
      email: '',
      password: '',
      code: '',
      validatePassword: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'E-mail inválido'),
    },
  });

  const { classes } = useResetPasswordStyles();

  const sendEmailCode = async () => {
    event.preventDefault();

    setIsSendingCode(true);

    try {
      await Auth.forgotPassword(resetPasswordForm.values.email);
      setCodeSent(true);
    } catch (error) {
      console.log(error);
      setIsSendingCode(false);
    }
  };

  const submitPasswordChange = async () => {
    event.preventDefault();

    setIsConfirming(true);

    try {
      await Auth.forgotPasswordSubmit(
        resetPasswordForm.values.email,
        resetPasswordForm.values.code,
        resetPasswordForm.values.password,
      );
      setConfirmed(true);
    } catch (error) {
      console.log(error);
      setIsConfirming(false);
    }
  };

  const renderRequestCodeForm = () => (
    <div className={classes.wrapper}>
      <div className={classes.formWrapper}>
        <Box sx={{ maxWidth: 340 }} mx="auto">
          <Title order={2} className={classes.forgotTitle}>Esqueceu a senha?</Title>
          <Text size="md" className={classes.informationText}>
            Informe o seu e-mail e enviaremos
            um link para redefinir sua senha.
          </Text>
          <form onSubmit={resetPasswordForm.onSubmit(sendEmailCode)}>
            <TextInput
              required
              label="Seu e-mail"
              placeholder="exemplo@mail.com"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...resetPasswordForm.getInputProps('email')}
            />
            <div>
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
              <Button size="lg" fullWidth type="submit" color="green">Enviar código</Button>
            </Center>
          </form>
        </Box>
      </div>
      <div className={classes.imageWrapper}>
        <img src={Fundo} alt="fundo" />
      </div>
    </div>
  );

  const renderConfirmationForm = () => (
    <div className={classes.wrapper}>
      <div className={classes.formWrapper}>
        <Box sx={{ width: 340 }} mx="auto">
          <Title order={2} className={classes.resetTitle}>Redefinir a senha</Title>
          <form onSubmit={resetPasswordForm.onSubmit(submitPasswordChange)} className={classes.confirmForm}>
            <TextInput
              required
              label="Seu código de confirmação"
              placeholder="exemplo@mail.com"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...resetPasswordForm.getInputProps('code')}
            />

            <PasswordInput
              required
              label="Sua nova senha"
              placeholder="*********"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...resetPasswordForm.getInputProps('password')}
              className={classes.confirmInput}
            />

            <PasswordInput
              required
              label="Confirme sua nova senha"
              placeholder="*********"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...resetPasswordForm.getInputProps('validatePassword')}
              className={classes.confirmInput}
            />
            <div>
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
              <Button size="lg" fullWidth type="submit" color="green">Enviar código</Button>
            </Center>
          </form>
        </Box>
      </div>
      <div className={classes.imageWrapper}>
        <img src={Fundo} alt="fundo" />
      </div>
    </div>
  );

  return (
    <div>
      {!codeSent
        ? renderRequestCodeForm()
        : !confirmed
          ? renderConfirmationForm() : <Navigate to="/login" />}
    </div>
  );
};
