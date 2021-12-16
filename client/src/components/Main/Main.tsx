import React from 'react';
import { PaginationItem, PaginationItems, VacanciesBlock } from './Main.styles';
import { Loader } from '@components/index';
import { VacancyItemComponent } from './VacancyItem';
import { Details } from '@components/Details/Details';
import { Main as MainBlock } from './Main.styles';
import { useQuery, DocumentNode } from '@apollo/client';
import { IS_DETAIL_ID } from '../../schemas';
import { vacancyIdVar, isVisibleVar } from '@cache/index';

interface IProps {
  jobs: any;
  schema: DocumentNode;
  isVacancies: boolean;
  nextPage?: () => void;
  prevPage?: () => void;
  isPagination?: boolean;
}

export const Main: React.FC<IProps> = ({
  jobs,
  schema,
  isVacancies,
  nextPage,
  isPagination,
  prevPage,
}) => {
  const { loading, error } = useQuery(schema);
  const { data } = useQuery(IS_DETAIL_ID);
  console.log('data: ', data);

  const isVisible = data && data.isVisible;

  React.useEffect(() => {
    console.log(loading);
    if(isVacancies && !loading) {
      vacancyIdVar(jobs[0].id);
      console.log(vacancyIdVar());
      isVisibleVar(true)
    }
    return () => {
      isVisibleVar(false)
    }
  }, [loading, jobs, isVacancies]);

  if (loading) return <Loader />;
  if (error) return <p>Что то пошло не так...</p>;

  return (
    <>

        <MainBlock>
          <VacanciesBlock>
            {isVacancies &&
              jobs.map((item: {id: string}) => (
                <VacancyItemComponent key={Math.random() * 2525} id={item.id} />
              ))}
            {isPagination && (
              <PaginationItems>
                <PaginationItem onClick={prevPage}>{'<'}</PaginationItem>
                <PaginationItem onClick={nextPage}>{'>'}</PaginationItem>
              </PaginationItems>
            )}
          </VacanciesBlock>
          <div id="root-portal"></div>
          {isVisible && <Details />}
        </MainBlock>

    </>
  );
};
