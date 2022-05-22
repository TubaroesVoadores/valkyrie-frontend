import { createStyles } from '@mantine/core';

export const useProjectInfosStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    gap: '4rem',
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      flexDirection: 'column',
      alignItems: 'normal',
      gap: '1rem',
    },
  },
  detailsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  infoCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: 'max-content',
  },
  imagesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'flex-end',
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      alignItems: 'normal',
    },
  },
}));
