import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { JOB_ITEMS } from '../../schemas';
import { Container } from '@components/index';
import { VacancyItemComponent } from '@components/VacancyItem/VacancyItem';
import HomeImg from '@assets/img/home.png';
import { Button } from '@styles/common';

const Main = styled.div`
  background-image: url(${HomeImg});
  width: 100%;
  height: 785px;
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${({ theme }) => theme.secondary};
  text-align: center;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  color: ${({ theme }) => theme.defaultColor};
  text-align: center;
`;

const LatestVacation = styled.section`
  padding: 60px 0 60px;
`;

const LatestTitle = styled.h3`
  font-size: 24px;
  text-align: center;
  margin-bottom: 45px;
  font-weight: 600;

  line-height: 100%;
  color: #6b8397;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
  font-weight: 600;
`;

export const Home = () => {
  const { data } = useQuery(JOB_ITEMS);

  const sliceItems = data && data.vacancies.items.slice(0, 5);
  return (
    <>
      <Main>
        <div>
          <Title>Найди работу мечты</Title>
          <Subtitle>{data && data.vacancies.found} вакансий доступны прямо сейчас</Subtitle>
        </div>
      </Main>
      <Container>
        <LatestVacation>
          <LatestTitle>Недавние вакансии:</LatestTitle>
          <div>
            {sliceItems &&
              sliceItems.map((item: { id: string }) => (
                <VacancyItemComponent key={item.id} id={item.id} isHasActive={false} path="jobs/" />
              ))}
          </div>
          <ButtonContainer>
            <Link to="/jobs">
              <Button>Посмотреть все</Button>
            </Link>
          </ButtonContainer>
        </LatestVacation>
      </Container>
    </>
  );
};
