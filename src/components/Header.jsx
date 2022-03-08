/* eslint-disable arrow-body-style */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { styled } from '../stitches.config';

const HeaderWrapper = styled('div', {
  backgroundColor: 'transparent',
  padding: '.5rem 15rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const LogoTitle = styled('h1', {
  fontSize: '$display_sm',
  fontWeight: '$semibold',
});

const ActionsWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

const Link = styled(RouterLink, {
  color: '$neutral500',
  fontSize: '$body_md',
  fontWeight: '$semibold',
  textDecoration: 'none',
  '&:hover': {
    color: '$primary900',
  },
});

const Button = styled(RouterLink, {
  color: '$neutral50',
  backgroundColor: '$primary600',
  fontSize: '$body_md',
  lineHeight: '$body_md',
  fontWeight: '$semibold',
  padding: '1rem 1.5rem',
  borderRadius: '$xxl',
  textDecoration: 'none',
  transition: 'background-color 0.5s ease-in-out',
  '&:hover': {
    backgroundColor: '$primary900',
  },
});

export const Header = () => {
  return (
    <HeaderWrapper>
      <LogoTitle>valkyrie.</LogoTitle>
      <ActionsWrapper>
        <Link to="/">Home</Link>
        <Button to="/register">Register</Button>
      </ActionsWrapper>
    </HeaderWrapper>
  );
};
