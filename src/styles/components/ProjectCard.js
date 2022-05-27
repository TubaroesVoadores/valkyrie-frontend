import { createStyles } from '@mantine/core';

export const useProjectCardStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    gap: '1rem',
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.sm,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    position: 'relative',
    cursor: 'pointer',
  },
  title: {
    fontWeight: 500,
  },
  detailsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  detailsTitle: {
    fontSize: theme.fontSizes.xs,
    fontWeight: 600,
    color: theme.colors.green[6],
  },
  icon: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
}));
