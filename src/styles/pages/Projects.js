import { createStyles } from '@mantine/core';

export const useProjectsStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: '3rem 12.5rem 0',
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      margin: '2rem 6.25rem 0',
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      margin: '1rem 2rem 0',
    },
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectsList: {
    margin: '2rem 0',
  },
}));
