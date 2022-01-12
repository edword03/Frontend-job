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
} from './Details.styles';
import { Portal } from '@components/Portal';
import { DETAILS_INFO } from '../../schemas';
import { Loader } from '..';
import CloseIcon from '@assets/img/svg/close.svg';
import { useMedia } from '@hooks/useMedia';
import { isVisibleVar } from '@cache/index';

const GET_ID = gql`
  query Id {
    vacancyId @client
  }
`;

export const Details = () => {
  console.log('details render');
  const details = useQuery(GET_ID);
  const { loading, error, data } = useQuery(DETAILS_INFO, {
    variables: { id: details.data.vacancyId },
  });

  const { isMobile } = useMedia();

  const salaryFrom = data && data.vacancyItem && data.vacancyItem.salary?.from;
  const salaryTo = data && data.vacancyItem && data.vacancyItem.salary?.to;
  const currency = data && data.vacancyItem && data.vacancyItem.salary?.currency;
  const currencyFormat = currency === 'RUR' ? 'руб.' : currency;

  const totalSalary =
    data && data.vacancyItem.salary
      ? (salaryFrom ? `от ${salaryFrom} ` : '') +
        (salaryTo ? `до ${salaryTo}` : '') +
        ` ${currencyFormat}`
      : null;

  const logoSrc =
    data &&
    data.vacancyItem &&
    data.vacancyItem.employer &&
    data.vacancyItem.employer.logo_urls &&
    data.vacancyItem.employer.logo_urls.original;

  const city =
    data && data.vacancyItem && data.vacancyItem.address && data.vacancyItem.address.city;
  const companyTitle =
    data && data.vacancyItem && data.vacancyItem.employer && data.vacancyItem.employer.name;

  const closeDetail = () => {
    isVisibleVar(false);
  };

  if (loading) {
    return (
      <Portal>
        <DetailsBlock style={{width: '100%', height: '100%'}}>
          <Loader />
        </DetailsBlock>
      </Portal>
    );
  }

  if (error) {
    return <h2>Ошибка запроса</h2>;
  }

  return (
    <Portal>
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
                <DetailsSubtitle>{companyTitle}</DetailsSubtitle>
                {city && <Delimetr />}
                <DetailsSubtitle>{city}</DetailsSubtitle>
              </DetailsSubtitleBlock>
            </div>
          </DetailsHeader>
          <Experience>
            Требуемый опыт работы:
            {data &&
              data.vacancyItem &&
              data.vacancyItem.experience &&
              data.vacancyItem.experience.name}
          </Experience>
          <DetailsSalary>{totalSalary}</DetailsSalary>
        </DetailsHead>
        <DetailsDescription
          dangerouslySetInnerHTML={{ __html: data.vacancyItem.description }}></DetailsDescription>
      </DetailsBlock>
    </Portal>
  );
};
