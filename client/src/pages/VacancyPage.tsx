import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { DETAILS_INFO } from '../schemas';
import { Loader, Container } from '@components/index';
import { Button, DetailsDescription, HeadLogo, PageBlock } from '@styles/common';
import {
  Delimetr,
  DetailsHead,
  DetailsHeader,
  DetailsSalary,
  DetailsSubtitle,
  DetailsSubtitleBlock,
  DetailsTitle,
  Experience,
  ExperienceRequire,
  LogoSection,
} from '@components/Details/Details.styles';

export const VacancyPage = () => {
  const navigate = useNavigate()
  const { job } = useParams();
  const { data, loading, error } = useQuery(DETAILS_INFO, {
    variables: { id: job },
  });

  const salaryFrom = data && data.vacancyItem && data.vacancyItem.salary?.from;
  const salaryTo = data && data.vacancyItem && data.vacancyItem.salary?.to;
  const currency = data && data.vacancyItem && data.vacancyItem.salary?.currency;
  const currencyFormat = currency === 'RUR' ? 'руб.' : currency;

  const totalSalary =
    data && data.vacancyItem.salary
      ? `${salaryFrom ? `от ${salaryFrom}` : ''} ${
          salaryTo ? `до ${salaryTo}` : ''
        } ${currencyFormat}`
      : null;

  const logoSrc =
    data &&
    data.vacancyItem &&
    data.vacancyItem.employer &&
    data.vacancyItem.employer.logo_urls &&
    data.vacancyItem.employer.logo_urls.original;

  const city =
    data && data.vacancyItem && data.vacancyItem.address && data.vacancyItem.address.city;
  const companyTitle = data?.vacancyItem.employer.name;

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
    return (
      <Container>
        <PageBlock>
          <h2>Ошибка зпроса</h2>
        </PageBlock>
      </Container>
    );
  }
  console.log(data);
  return (
    <Container>
      <PageBlock>
        <DetailsHead>
          <DetailsHeader>
            <LogoSection>{logoSrc && <HeadLogo src={logoSrc} />}</LogoSection>
            <div style={{ marginRight: 'auto' }}>
              <DetailsTitle>{data && data.vacancyItem.name}</DetailsTitle>
              <DetailsSubtitleBlock>
                <DetailsSubtitle data-testid="companyTitle">{companyTitle}</DetailsSubtitle>
                {city && <Delimetr />}
                <DetailsSubtitle>{city}</DetailsSubtitle>
              </DetailsSubtitleBlock>
            </div>
          </DetailsHeader>
          <Experience>
            <ExperienceRequire>Требуемый опыт работы:</ExperienceRequire>
            {data &&
              data.vacancyItem &&
              data.vacancyItem.experience &&
              data.vacancyItem.experience.name}
          </Experience>
          <DetailsSalary>{totalSalary}</DetailsSalary>
        </DetailsHead>
        <DetailsDescription
          dangerouslySetInnerHTML={{
            __html:
              data && data.vacancyItem.branded_description
                ? data.vacancyItem.branded_description
                : data && data.vacancyItem.description
                ? data.vacancyItem.description
                : '',
          }}
          isBranded={data && !!data.vacancyItem.branded_description}></DetailsDescription>
        <Button onClick={() => navigate(-1)}>Назад</Button>
      </PageBlock>
    </Container>
  );
};
