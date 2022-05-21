import { createStyles } from '@mantine/core';

export const useLandingStyles = createStyles((theme) => ({
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    margin: '17rem 12.5rem',
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      alignContent: 'center',
      justifyContent: 'center',
    },
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    width: '100%',
    height: '100%',
  },

  imageWrapper: {
    height: '10px',
    marginRight: '200px',
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      display: 'none',
    },
  },
}));
