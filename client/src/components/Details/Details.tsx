import React from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import {
  DetailsBlock,
  DetailsHead,
  DetailsSalary,
  DetailsTitle,
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
import { DetailsDescription, HeadLogo } from '@styles/common';

const GET_ID = gql`
  query Id {
    vacancyId @client
  }
`;

export const Details = (): React.ReactElement => {
  const details = useQuery<VacancyIdType>(GET_ID);
  const { id } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();

  const { loading, error, data } = useQuery<DetailsInfoType>(DETAILS_INFO, {
    variables: { id: details?.data?.vacancyId || id },
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
    navigate('/jobs' + search);
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
              <Link to={`/companies/${data && data.vacancyItem.employer.id}`}>
                <DetailsSubtitle data-testid="companyTitle">{companyTitle}</DetailsSubtitle>
              </Link>
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
