import React from 'react';
import { SearchBar } from '@components/index';
import { Main } from '@components/Main/Main'

export const SearchJobs = () => {
  return (
    <>
      {/* <h1 style={{ marginTop: '140px' }}>Поиск</h1> */}
      <SearchBar />
      <Main />
    </>
  );
};
