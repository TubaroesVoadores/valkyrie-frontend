import { createStyles } from '@mantine/core';

export const useLandingStyles = createStyles((theme) => ({
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    margin: '17rem 12.5rem',
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      width: '100vw',
      height: '100vh',
      alignContent: 'center',
      justifyContent: 'center',
    },
  },

  imageWrapper: {
    width: '40%',
    marginRight: '100px',
    marginTop: '-90px',
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: 'none',
    },
  },

  formWrapper: {
    width: '100%',
    height: '700px',
    display: 'flex',
    justifyContent: 'center',
    background: theme.colors.green[1],
  },

  form: {
    width: '50%',

    label: {
      fontSize: '15px',
    },
  },
}));
