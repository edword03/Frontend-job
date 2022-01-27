import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  DetailsBlock,
  DetailsDescription,
  DetailsHead,
  DetailsSalary,
  DetailsTitle,
  HeadLogo,
  DetailsHeader,
  DetailsSubtitle,
  DetailsSubtitleBlock,
  Delimetr,
  Experience,
  LogoSection,
  ExperienceRequire,
} from './Details.styles';
import { DETAILS_INFO } from '../../schemas';
import { Loader } from '..';
import CloseIcon from '@assets/img/svg/close.svg';
import { useMedia } from '@hooks/useMedia';
import { isVisibleVar } from '@cache/index';
import { DetailsInfoType, VacancyIdType } from '$types/detailsTypes';

const GET_ID = gql`
  query Id {
    vacancyId @client
  }
`;

export const Details = (): React.ReactElement => {
  const details = useQuery<VacancyIdType>(GET_ID);
  const { loading, error, data } = useQuery<DetailsInfoType>(DETAILS_INFO, {
    variables: { id: details?.data?.vacancyId },
  });

  const { isDesktop, isMobile } = useMedia();

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

  const closeDetail = () => {
    isVisibleVar(false);
  };

  if (loading) {
    return (
      <DetailsBlock>
        <Loader />
      </DetailsBlock>
    );
  }

  if (error) {
    return (
      <DetailsBlock>
        <h2>Ошибка запроса</h2>
      </DetailsBlock>
    );
  }

  return (
    <DetailsBlock>
      <DetailsHead>
        <DetailsHeader>
          <LogoSection>
            {logoSrc && <HeadLogo src={logoSrc} />}
            {isMobile && <img src={CloseIcon} alt="close icon" onClick={closeDetail} />}
          </LogoSection>
          <div style={{ marginRight: 'auto' }}>
            <DetailsTitle>{data && data.vacancyItem.name}</DetailsTitle>
            <DetailsSubtitleBlock>
              <DetailsSubtitle data-testid="companyTitle">{companyTitle}</DetailsSubtitle>
              {city && <Delimetr />}
              <DetailsSubtitle>{city}</DetailsSubtitle>
            </DetailsSubtitleBlock>
          </div>
          {!isDesktop && !isMobile && (
            <img src={CloseIcon} alt="close icon" onClick={closeDetail} />
          )}
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
    </DetailsBlock>
  );
};
