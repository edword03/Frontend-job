import React from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { SearchBar } from '@components/index';
import { Main } from '@components/Main/Main';
import { JOB_ITEMS } from '../../schemas';
import { queryParamsVar } from '@cache/index';

export const SearchJobs = () => {
  const [page, setPage] = React.useState(0);
  const query = useReactiveVar(queryParamsVar);
  const { data, refetch } = useQuery(JOB_ITEMS, {
    notifyOnNetworkStatusChange: true,
    variables: { city: query.city, page: page.toLocaleString() },
  });

  const isVacancies = React.useMemo(
    () => data && data.vacancies && data.vacancies.items.length > 0,
    [data],
  );


  const jobs = React.useMemo(() => data && data.vacancies && data.vacancies.items, [data]);

  const increaseCurrentPage = () => {
    if (page < 100) {
      setPage(prevState => prevState + 1);
    }
  };
  const decreaseCurrentPage = () => {
    if (page > 0) {
      setPage(prevState => prevState - 1);
    }
  };

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
