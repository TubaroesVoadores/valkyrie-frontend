import { createStyles } from '@mantine/core';

export const useProjectStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: '3rem 12.5rem',
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      margin: '2rem 6.25rem',
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      margin: '2rem 3rem',
    },
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      margin: '1rem 2rem',
    },
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      margin: '1rem 2rem',
    },
  },
  heading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  breadcrumbs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  projectInfos: {
    margin: '2rem 0 0',
  },
}));
