import React, {useRef} from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useQuery, useReactiveVar } from '@apollo/client';
import { Container, SearchBar } from '@components/index';
import { Main } from '@components/index';
import { serializeQuery, deserializeQuery } from '@utils/index';
import { JOB_ITEMS } from '../../schemas';
import { queryParamsVar } from '@cache/index';

export const SearchJobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = React.useState(searchParams.get('page') || 0);
  const query = useReactiveVar(queryParamsVar);
  const { search } = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { data, refetch } = useQuery(JOB_ITEMS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      city: query.city,
      schedule: query.schedule,
      employment: query.employment,
      experience: query.experience,
      salary: query.salary,
      page: page.toLocaleString(),
      currency: query.currency,
    },
  });

  React.useEffect(() => {
    setSearchParams(serializeQuery({ ...deserializeQuery(search), page }));
  }, [page, search, setSearchParams, setPage]);

  const isVacancies = data && data.vacancies && data.vacancies.items.length > 0;

  const jobs = data && data.vacancies && data.vacancies.items;

  const increaseCurrentPage = React.useCallback(() => {
    if (page < 100) {
      if(wrapperRef) {
        wrapperRef?.current?.scrollIntoView()
      }
      setPage(prev => +prev + 1);
    }
  }, [page]);

  const decreaseCurrentPage = React.useCallback(async () => {
    if (page > 0) {
      wrapperRef && wrapperRef?.current?.scrollIntoView()
      setPage(prev => +prev - 1);
    }
  }, [page]);

  return (
    <>
      <Container>
        <SearchBar refetch={refetch} />
        <Main
          jobs={jobs}
          schema={JOB_ITEMS}
          isVacancies={isVacancies}
          nextPage={increaseCurrentPage}
          prevPage={decreaseCurrentPage}
          isPagination
          ref={wrapperRef}
        />
      </Container>
    </>
  );
};
