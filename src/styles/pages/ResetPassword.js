import { createStyles } from '@mantine/core';

export const useResetPasswordStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      alignContent: 'center',
      justifyContent: 'center',
    },
  },

  formWrapper: {
    width: '1000px',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },

    a: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '16px',
    },

    input: {
      marginBottom: '16px',
    },
  },

  imageWrapper: {
    background: theme.colors.green[1],
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    img: {
      height: '50%',
    },

    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: 'none',
    },
  },

  forgotTitle: {
    marginBottom: '32px',
  },

  informationText: {
    marginBottom: '16px',
  },

  resetTitle: {
    marginBottom: '12px',
  },

  confirmInput: {
    marginBottom: '12px',
  },
}));
