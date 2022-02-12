import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from '@components/index';

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const ErrorTitle = styled.h1`
  font-size: 7em;
  color: ${props => props.theme.secondary};
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.defaultColor};
  font-size: 18px;
  font-weight: 700;

  @media screen and (max-width: 540px) {
    text-align: center;
  }
`;

const HomeLink = styled(Link)`
  background: #0070fb;
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: ${props => props.theme.white};
  padding: 20px 22px;
  margin-top: 20px;
`;

export const ErrorPage = () => {
  return (
    <>
      <Container>
        <ErrorContainer>
          <ErrorTitle>404</ErrorTitle>
          <ErrorMessage>Упс...запрашиваемая вами страница не найдена</ErrorMessage>
          <HomeLink to="/">На главную</HomeLink>
        </ErrorContainer>
      </Container>
    </>
  );
};
