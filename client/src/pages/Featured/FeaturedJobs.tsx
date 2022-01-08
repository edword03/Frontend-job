import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { Main } from '@components/index';
import { favoriteVacanciesVar } from '@cache/index';
import { JOB_ITEMS } from '../../schemas';

export const FeaturedJobs = () => {
  const favoriteVacancies = useReactiveVar(favoriteVacanciesVar)

  return (
    <>
      <h1 style={{ marginTop: '140px' }}> </h1>
      {favoriteVacancies.length > 0 ? (
        <Main
          jobs={favoriteVacancies}
          schema={JOB_ITEMS}
          isVacancies={favoriteVacancies.length > 0}
        />
      ) : (
        <p>Вы еще не добавляли вакансии в избранные</p>
      )}
    </>
  );
};
