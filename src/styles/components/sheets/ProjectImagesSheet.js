import { createStyles } from '@mantine/core';

export const useProjectImagesSheetStyles = createStyles(() => ({
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    gap: '1rem',
  },
  imageContainer: {
    position: 'relative',
  },
  overlayIcon: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    zIndex: 10,
  },
  overlay: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0.5rem',
  },
}));
