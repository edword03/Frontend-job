import React from 'react';
import { useQuery } from '@apollo/client';
import { SearchBar } from '@components/index';
import { Main } from '@components/Main/Main';
import { JOB_ITEMS } from '../../schemas';

export const SearchJobs = () => {
  const [city, setCity] = React.useState('');
  const { data, refetch } = useQuery(JOB_ITEMS, {
    notifyOnNetworkStatusChange: true,
    variables: { city },
  });
  const isVacancies = (data && data.vacancies && data.vacancies.items.length > 0)
  const jobs = data && data.vacancies && data.vacancies.items

  console.log(data);
  return (
    <>
      <SearchBar refetch={refetch} setCityVariable={setCity} />
      <Main jobs={jobs} schema={JOB_ITEMS} isVacancies={isVacancies} />
    </>
  );
};
