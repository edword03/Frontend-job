import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CompanyItem, VACANCIES_COMPANY } from '../../schemas';
import { Loader, Container, VacancyItemComponent } from '@components/index';
import { DetailsDescription, HeadLogo, PageBlock, EmptyLogo } from '@styles/common';

const HeadCompany = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f9f9f9;

  @media screen and (max-width: 600px){

    flex-direction: column;
    align-items: flex-start;
  }
`;

const CompanyTitle = styled.h1`
  font-weight: 500;
  font-size: 35px;
  line-height: 24px;
`;

const ResentTitle = styled.h3`
  font-size: 22px;
  margin: 45px 0 45px;
  font-weight: 500;
  line-height: 100%;
  color: #0c0d0e;
`;

export const CompanyPage = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(CompanyItem, {
    variables: { id },
  });
  const vacancies = useQuery(VACANCIES_COMPANY, {
    variables: { id },
  });

  const logo = data && data.companyItem.logo_urls && data.companyItem.logo_urls.original;
  console.log('vacancies: ', vacancies.data);
  const title = data && data.companyItem.name;

  if (loading) {
    return (
      <Container>
        <PageBlock style={{display: 'flex', minHeight: '100vh'}}>
          <Loader />
        </PageBlock>
      </Container>
    );
  }

  if (error) {
    return <h2>Не найдено</h2>;
  }

  return (
    <Container>
      <PageBlock>
        <HeadCompany>
          <div>{logo ? <HeadLogo src={logo} alt="Логотип компании" /> : <EmptyLogo />}</div>
          <CompanyTitle>{title}</CompanyTitle>
        </HeadCompany>
        <DetailsDescription
          dangerouslySetInnerHTML={{
            __html:
              data && data.companyItem.branded_description
                ? data.companyItem.branded_description
                : data && data.companyItem.description,
          }}
          isBranded={data && !!data.companyItem.branded_description}></DetailsDescription>
        <ResentTitle>Открытые вакансии</ResentTitle>
        <div>
          {vacancies &&
            vacancies.data &&
            vacancies.data.vacanciesCompany.items.map((item: { id: string }) => (
              <VacancyItemComponent id={item.id} key={item.id} path={'vacancies/'} isCompanyVacancy />
            ))}
        </div>
      </PageBlock>
    </Container>
  );
};
