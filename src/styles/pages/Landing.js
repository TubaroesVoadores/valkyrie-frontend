import { createStyles } from '@mantine/core';

export const useLandingStyles = createStyles((theme) => ({
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  },
}));
