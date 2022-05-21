import React, { useState } from 'react';

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
  Center,
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
      await API.post('project', 'landingEmail', {
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
            <div>
              <form onSubmit={landingForm.onSubmit(sendEmail)}>
                <Paper withBorder shadow="md" p={30} mt={100} radius="md">
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
                  <Button fullWidth mt="xl" type="submit" loading={isLoading}>
                    {isLoading ? 'Enviando email' : 'Enviar email'}
                  </Button>
                </Paper>
              </form>
            </div>
          </div>
        </div>
        <div style={{ width: '70%', paddingBottom: 100 }}>
          <Image
            src={Landing}
            alt="fundo"
          />
        </div>
      </div>
      {/* style={{ width: '30%', marginTop: -350, marginLeft: '10%' }} */}
    </>
  );
};
