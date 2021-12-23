import React from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { SearchBar } from '@components/index';
import { Main } from '@components/Main/Main';
import { JOB_ITEMS } from '../../schemas';
import { queryParamsVar } from '@cache/index';

export const SearchJobs = () => {
  const [page, setPage] = React.useState(0);
  const query = useReactiveVar(queryParamsVar);
  console.log('query: ', query);
  const { data, refetch } = useQuery(JOB_ITEMS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      city: query.city,
      schedule: query.schedule,
      employment: query.employment,
      experience: query.experience,
      salary: query.salary,
      page: page.toLocaleString(),
      currency: query.currency
    },
  });

  const isVacancies = data && data.vacancies && data.vacancies.items.length > 0;

  const jobs = data && data.vacancies && data.vacancies.items;

  const increaseCurrentPage = React.useCallback(() => {
    if (page < 100) {
      setPage(prevState => prevState + 1);
    }
  }, [page]);

  const decreaseCurrentPage = React.useCallback(() => {
    if (page > 0) {
      setPage(prevState => prevState - 1);
    }
  }, [page]);

  console.log(data);
  return (
    <>
      <SearchBar refetch={refetch} />
      <Main
        jobs={jobs}
        schema={JOB_ITEMS}
        isVacancies={isVacancies}
        nextPage={increaseCurrentPage}
        prevPage={decreaseCurrentPage}
        isPagination
      />
    </>
  );
};
