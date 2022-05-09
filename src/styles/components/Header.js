import { createStyles } from '@mantine/core';

export const useHeaderStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
    margin: '0 12.5rem',
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      margin: '0 6.25rem',
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      margin: '0 3rem',
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      margin: '0 2rem',
    },
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      margin: '0 2rem',
    },
  },
  anchor: {
    color: theme.colors.dark[9],
    ':hover': {
      textDecoration: 'none',
    },
  },
  button: {
    color: theme.colors.gray[7],
    ':hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    color: theme.colors.green[9],
  },
}));
