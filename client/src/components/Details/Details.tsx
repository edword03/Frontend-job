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
} from './Details.styles';
import { Portal } from '@components/Portal';

const VACANCY_ITEM = gql`
  query Item($id: ID) {
    vacancyItem(id: $id) {
      id
      name
      description
      salary {
        currency
        from
        to
        gross
      }
      employer {
        name
        logo_urls {
          original
          _90
          _240
        }
      }
      address {
        city
      }
    }
  }
`;

const GET_ID = gql`
  query Id {
    vacancyId @client
  }
`;

export const Details = () => {
  console.log('details render');
  const details = useQuery(GET_ID);
  const { loading, error, data } = useQuery(VACANCY_ITEM, {
    variables: { id: details.data.vacancyId },
  });
  console.log(data);

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

  if (loading) {
    return (
      <Portal>
        <h2>Загрузка</h2>
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
            {logoSrc && <HeadLogo src={logoSrc} />}
            <div style={{ marginRight: 'auto' }}>
              <DetailsTitle>{data && data.vacancyItem.name}</DetailsTitle>
              <DetailsSubtitleBlock>
                <DetailsSubtitle>{data && data.vacancyItem.employer.name}</DetailsSubtitle>
                {city && <Delimetr />}
                <DetailsSubtitle>{city}</DetailsSubtitle>
              </DetailsSubtitleBlock>
            </div>
          </DetailsHeader>
          <DetailsSalary>{totalSalary}</DetailsSalary>
        </DetailsHead>
        <DetailsDescription
          dangerouslySetInnerHTML={{ __html: data.vacancyItem.description }}></DetailsDescription>
      </DetailsBlock>
    </Portal>
  );
};
