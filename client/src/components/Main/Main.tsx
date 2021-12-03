import React from 'react';
import { Container } from '@components/UI/Container';
import { VacanciesBlock } from './Main.styles';
import { VacancyItemComponent } from './VacancyItem';
import { Iitem } from '$types/type';
import { getVacancies } from '@services/api';
import { Details } from '@components/Details/Details';
import { Main as MainBlock } from './Main.styles';
import { useQuery, gql } from '@apollo/client';


const JOB_ITEMS = gql`
  query Job {
    getVacancies {
      items {
        name
        employer {
          logo_urls {
            _240
            _90
            original
          }
          name
        }
        address {
          city
        }
        id
      }
    }
  }
`

export const Main = () => {
  // const [data, setData] = React.useState<Array<Iitem>>([]);
  const {loading, error, data} = useQuery(JOB_ITEMS)
  console.log(data)
  // React.useEffect(() => {
  //   async function setDataFetch() {
  //     const res = await getVacancies();
  //     console.log(res);
  //     setData(res.items);
  //   }
  //   setDataFetch();
  // }, []);


  if (loading) return <p>Загрузка...</p>
  if (error) return <p>Что то пошло не так...</p>

  return ( 
    <>
      <MainBlock>
        <VacanciesBlock id="vacancyClick"> 
          {data.getVacancies.items ? (
            data.getVacancies.items.map((item: any) => ( 
              <VacancyItemComponent
                key={Math.random() * 2525}
                title={item.name}
                logo={item.employer.logo_urls ? (item.employer.logo_urls.original || item.employer.logo_urls['90'] || item.employer.logo_urls['240']) : ''}
                company={item.employer.name}
                city={item.address ? item.address.city : ''}
                id={item.id}
              />
            ))
          ) : (
            <p>Вакансии не найдены</p>
          )}
        </VacanciesBlock>
        <div id="root-portal"> </div>
      </MainBlock>
    </>
  );
};
