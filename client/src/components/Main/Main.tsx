import React from 'react';
import { Container } from '@components/UI/Container';
import { VacanciesBlock } from './Main.styles';
import { VacancyItemComponent } from './VacancyItem';
import { Iitem } from '$types/type';
import { getVacancies } from '@services/api';
import { Details } from '@components/Details/Details';
import { Main as MainBlock } from './Main.styles';
import { useQuery, gql, DocumentNode } from '@apollo/client';
import { IS_DETAIL_ID } from '../../schemas';

interface IProps {
  jobs: any
  schema: DocumentNode
  isVacancies: boolean
}

export const Main: React.FC<IProps> = ({jobs, schema, isVacancies}) => {
  const { loading, error } = useQuery(schema);
  const {data} = useQuery(IS_DETAIL_ID) 
  console.log('data: ', data);

  const isVisible = data && data.isVisible

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Что то пошло не так...</p>;


  return (
    <>
      <MainBlock>
        <VacanciesBlock>
          {isVacancies ? (
            jobs.map((item: any) => (
              <VacancyItemComponent
                key={Math.random() * 2525}
                title={item.name} 
                city={item.address ? item.address.city : ''}
                id={item.id}
              />
            ))
          ) : (
            <p>Вакансии не найдены</p>
          )}
        </VacanciesBlock>
        <div id="root-portal"></div>
        {isVisible && <Details />}
      </MainBlock>
    </>
  );
};
