import React from 'react';

import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Button,
  Textarea,
} from '@mantine/core';

import { useLandingStyles } from '../styles';

import Landing from '../assets/landing.svg';

export const LandingPage = () => {
  const { classes } = useLandingStyles();

  // TODO: funcao do botao
  // const func ..
  return (
    <div>

      <div className={classes.contentWrapper}>
        <div className={classes.textWrapper}>
          <Title>valkyrie</Title>
          <div style={{ width: 470, marginTop: 18 }}>
            <Text align="center" component="span" size="md">
              Solução inteligente para latifúndios com o
              objetivo de sensoriar a presente área de vegetação
              nativa na Amazônia.
            </Text>
            <div style={{ width: 106, marginTop: 18 }}>
              <Button
                size="md"
                type="submit"
                color="green"
              >
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
        <img src={Landing} alt="fundo" />
      </div>
      <div style={{ width: '90%' }}>
        <Paper withBorder shadow="md" p={30} mt={100} radius="md">
          <TextInput label="Nome" placeholder="Seu nome" required />
          <TextInput label="Email" placeholder="email@exemplo.com" required mt="md" />
          <Textarea
            placeholder="Your comment"
            label="Your comment"
            required
          />
          <Button fullWidth mt="xl">
            Enviar email
          </Button>
        </Paper>
      </div>
    </div>
  );
};
