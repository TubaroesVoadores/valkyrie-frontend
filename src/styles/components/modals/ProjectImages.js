import { createStyles } from '@mantine/core';

export const useProjectImagesStyles = createStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1rem',
    position: 'relative',
  },
  overlay: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0.5rem',
  },
  button: {
    marginTop: '0.5rem',
  },
}));
