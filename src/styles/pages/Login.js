import { createStyles } from '@mantine/core';

export const useLoginStyles = createStyles((theme) => ({
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
      display: 'felx',
      justifyContent: 'center',
      width: '100%',
    },

    h2: {
      marginBottom: '32px',
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

}));