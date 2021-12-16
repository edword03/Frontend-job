import React from 'react';
import { Header, Container } from '@components/index';
import { ThemeContext } from 'styled-components';
import { GlobalStyle, Theme } from '@styles/style.d';
import { FeaturedJobs, SearchJobs } from '@pages/index';
import { gql } from '@apollo/client';

type CurrenPageType = 'searchPage' | 'featuredPage';

export const JOB_INFO = gql`
  query Job {
    getFetch {
      items {
        name
      }
    }
  }
`

export const App = () => {
  const [currentPage, setCurrenPage] = React.useState<CurrenPageType>('searchPage');

  const toggleSearchPage = () => {
    setCurrenPage('searchPage');
  };

  const toggleFeaturedPage = () => {
    setCurrenPage('featuredPage');
  };

  return (
      <ThemeContext.Provider value={Theme}>
        <GlobalStyle />
        <Header
          currentPage={currentPage}
          setSearchPage={toggleSearchPage}
          setFeaturedPage={toggleFeaturedPage}
        />
        <Container>{currentPage === 'searchPage' ? <SearchJobs /> : <FeaturedJobs />}</Container>
      </ThemeContext.Provider>
  );
};
