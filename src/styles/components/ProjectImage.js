import { createStyles } from '@mantine/core';

export const useProjectImageStyles = createStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: '1rem',
  },
  detailsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
  },
  infos: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: 'max-content',
  },
}));
