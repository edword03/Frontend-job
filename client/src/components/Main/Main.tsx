import React from 'react';
import { useParams } from 'react-router-dom';
import { PaginationItem, PaginationItems, VacanciesBlock } from './Main.styles';
import { Loader } from '@components/index';
import { VacancyItemComponent } from '../VacancyItem/VacancyItem';
import { Details } from '@components/Details/Details';
import { Main as MainBlock } from './Main.styles';
import { useQuery, DocumentNode } from '@apollo/client';
import { IS_DETAIL_ID } from '../../schemas';
import { vacancyIdVar, isVisibleVar } from '@cache/index';
import { useMedia } from '@hooks/useMedia';

interface IProps {
  jobs: Array<{ id: string }>;
  schema: DocumentNode;
  isVacancies: boolean;
  nextPage?: () => void;
  prevPage?: () => void;
  isPagination?: boolean;
  ref?: { current: any };
}

export const Main = React.forwardRef(
  ({ jobs, schema, isVacancies, nextPage, isPagination, prevPage }: IProps, ref: any) => {
    const { loading, error } = useQuery(schema);
    const { data } = useQuery(IS_DETAIL_ID);
    const { isDesktop } = useMedia();
    const { id } = useParams();

    const isVisible = data && data.isVisible;

    React.useEffect(() => {
      if (isVacancies && !loading) {
        if (id) {
          vacancyIdVar(id);
          isVisibleVar(true);
        } else {
          vacancyIdVar(jobs[0].id);
          isVisibleVar(true);
        }
      }

      if (!isDesktop) {
        vacancyIdVar('');
        isVisibleVar(false);

        if (id) {
          vacancyIdVar(id);
          isVisibleVar(true);
        }
      }
      return () => {
        isVisibleVar(false);
      };
    }, [loading, jobs, isVacancies, isDesktop, id]);

    if (loading)
      return (
        <MainBlock>
          <VacanciesBlock>
            <Loader />
          </VacanciesBlock>
        </MainBlock>
      );
    if (error) return <p>Что то пошло не так...</p>;

    return (
      <>
        <MainBlock>
          <VacanciesBlock ref={ref}>
            {isVacancies &&
              jobs.map(item => (
                <VacancyItemComponent id={item.id} key={Math.random() * 2525} isHasActive />
              ))}
            {jobs && jobs.length < 1 && <p>Ничего не найдено</p>}
            {isPagination && isVacancies && (
              <PaginationItems>
                <PaginationItem onClick={prevPage}>{'<'}</PaginationItem>
                <PaginationItem onClick={nextPage}>{'>'}</PaginationItem>
              </PaginationItems>
            )}
          </VacanciesBlock>
          {isVisible && <Details />}
        </MainBlock>
      </>
    );
  },
);
