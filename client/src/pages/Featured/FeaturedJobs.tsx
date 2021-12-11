import React from 'react';
import { useQuery } from '@apollo/client';
import { Main } from '@components/index';
import { favoriteVacanciesVar } from '@cache/index';
import { JOB_ITEMS } from '../../schemas';


export const FeaturedJobs = () => {

  return (
    <>
      <h1 style={{ marginTop: '140px' }}></h1>
      <Main jobs={favoriteVacanciesVar()} schema={JOB_ITEMS} isVacancies={favoriteVacanciesVar().length > 0} />
    </>
  );
};
