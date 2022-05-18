/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';

import { useAppContext } from '../context/appContext';
import { useResetPasswordStyles } from '../styles';
import Fundo from '../assets/fundo.svg';

const schema = (codeSent) => Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  ...(codeSent && {
    code: Yup.string().required('Código é obrigatório'),
    password: Yup.string().min(8, 'Senha deve ter no mínimo 8 caracteres').required('Senha é obrigatória'),
  }),
});

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { classes } = useResetPasswordStyles();
  const { resetPassword, resetPasswordSubmit } = useAppContext();

  const [codeSent, setCodeSent] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const resetPasswordForm = useForm({
    schema: yupResolver(schema(codeSent)),
    initialValues: {
      email: '',
      ...(codeSent && {
        code: '',
        password: '',
      }),
    },
  });

  const handleResetPassword = async () => {
    setSendingCode(true);

    const { email } = resetPasswordForm.values;

    try {
      await resetPassword({ email });
      setSendingCode(false);
      setCodeSent(true);
    } catch (error) {
      setSendingCode(false);
      resetPasswordForm.setErrors({
        email: 'E-mail inválido',
      });
    }
  };

  const handleResetPasswordSubmit = async () => {
    setSubmitting(true);

    const { email, code, password } = resetPasswordForm.values;

    try {
      await resetPasswordSubmit(
        { email, code, password },
        () => navigate('/login'),
      );
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      resetPasswordForm.setErrors({
        code: 'Código inválido',
        password: 'Senha inválida',
      });
    }
  };

  const renderRequestCodeForm = () => (
    <div className={classes.wrapper}>
      <div className={classes.formWrapper}>
        <Box sx={{ width: 340 }} mx="auto">
          <Title order={2}>Esqueceu a senha?</Title>
          <Text size="md" sx={{ marginBottom: '0.5rem' }}>
            Informe o seu e-mail e enviaremos
            um link para redefinir sua senha.
          </Text>
          <form onSubmit={resetPasswordForm.onSubmit(handleResetPassword)} className={classes.form}>
            <TextInput
              required
              label="Seu e-mail"
              placeholder="exemplo@mail.com"
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
            <Center
              position="right"
              mt="md"
              sx={{ marginTop: '0.5rem', flexDirection: 'column', gap: '0.5rem' }}
            >
              <Button
                size="lg"
                fullWidth
                type="submit"
                color="green"
                loading={sendingCode}
              >
                Enviar código
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

  const renderConfirmationForm = () => (
    <div className={classes.wrapper}>
      <div className={classes.formWrapper}>
        <Box sx={{ width: 340 }} mx="auto">
          <Title order={2}>Redefinir a senha</Title>
          <form onSubmit={resetPasswordForm.onSubmit(handleResetPasswordSubmit)} className={classes.form}>
            <TextInput
              required
              label="Seu código de confirmação"
              placeholder="000000"
              {...resetPasswordForm.getInputProps('code')}
            />
            <PasswordInput
              required
              label="Sua nova senha"
              placeholder="Digite sua nova senha"
              className={classes.confirmInput}
              {...resetPasswordForm.getInputProps('password')}
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
            <Center
              position="right"
              mt="md"
              sx={{ marginTop: '0.5rem', flexDirection: 'column', gap: '0.5rem' }}
            >
              <Button
                size="lg"
                fullWidth
                type="submit"
                color="green"
                loading={submitting}
              >
                Enviar código
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

  return (
    <div>
      {!codeSent ? renderRequestCodeForm() : renderConfirmationForm()}
    </div>
  );
};
