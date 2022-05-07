import React, { useState } from 'react';

import { useForm } from '@mantine/form';

import { Auth } from 'aws-amplify';

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
  PasswordInput,
} from '@mantine/core';

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
  }

  const renderRequestCodeForm = () => (
    <div className="resetPasswordPage__wrapper">
      <div className="resetPasswordPage__formContainer">
        <Box sx={{ maxWidth: 340 }} mx="auto">
          <Title order={2} className="resetPasswordPage__formTitle">Esqueceu a senha?</Title>
          <Text size="md">Informe o seu e-mail e enviaremos um link para redefinir sua senha.</Text>
          <form onSubmit={resetPasswordForm.onSubmit(sendEmailCode)}>
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
              <Button size="lg" fullWidth type="submit" color="green">Enviar código</Button>
            </Center>
          </form>
        </Box>
      </div>
      <div className="resetPasswordPage__imageContainer">
        <img src={Fundo} alt="fundo" />
      </div>
    </div>
  );

  const renderConfirmationForm = () => (
    <div className="resetPasswordPage__wrapper">
      <div className="resetPasswordPage__formContainer">
        <Box sx={{ maxWidth: 340 }} mx="auto">
          <Title order={2} className="resetPasswordPage__formTitle">Redefinir a senha</Title>
          <form onSubmit={resetPasswordForm.onSubmit(submitPasswordChange)}>
            <TextInput
              required
              label="Seu código de confirmação"
              placeholder="exemplo@mail.com"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...resetPasswordForm.getInputProps('code')}
              className="resetPasswordPage__loginForm"
            />

            <PasswordInput
              required
              label="Sua nova senha"
              placeholder="*********"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...resetPasswordForm.getInputProps('password')}
              className="resetPasswordPage__loginForm"
            />

            <PasswordInput
              required
              label="Confirme sua nova senha"
              placeholder="*********"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...resetPasswordForm.getInputProps('validatePassword')}
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
              <Button size="lg" fullWidth type="submit" color="green">Enviar código</Button>
            </Center>
          </form>
        </Box>
      </div>
      <div className="resetPasswordPage__imageContainer">
        <img src={Fundo} alt="fundo" />
      </div>
    </div>
  );

  return (
    <div>
      {!codeSent
        ? renderRequestCodeForm()
        : !confirmed
        ? renderConfirmationForm()
        : <p>Done</p>}
    </div>
  );
};
