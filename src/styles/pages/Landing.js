import { createStyles } from '@mantine/core';

export const useLandingStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100vh',

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      justifyContent: 'center',
    },
  },

  informationWrapper: {
    margin: '12rem 12.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      margin: '0',
      transform: 'translateY(-150px)',
    },
  },

  titleStyle: {
    fontSize: '4rem',
  },

  description: {
    width: '400px',
    textAlign: 'left',
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: '300px',
    },
  },

  imageWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '100px',
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: 'none',
    },
  },

  buttonsWrapper: {
    marginTop: '18px',
    display: 'flex',
    gap: '1rem',

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
    },
  },

  formWrapper: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.colors.green[1],
  },

  form: {
    width: '35%',

    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },

    label: {
      fontSize: '15px',
    },

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      flexDirection: 'column',
      width: '100%',
      margin: '5px',
    },
  },
}));
