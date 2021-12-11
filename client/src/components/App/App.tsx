import React from 'react';
import { Header, Container } from '@components/index';
import styled, { ThemeContext } from 'styled-components';
import { GlobalStyle, Theme } from '@styles/style.d';
import { FeaturedJobs, SearchJobs } from '@pages/index';
import { getVacancies } from '@services/api'
import { useQuery, gql } from '@apollo/client';


type CurrenPageType = 'searchPage' | 'featuredPage';


interface ICity {
  name: string;
  id: number;
}

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
  // const [data, setData] = React.useState({});
  const { loading, error, data, refetch } = useQuery(JOB_INFO)

  // console.log(loading, error, data);

  // data.getFetch.items.map((item: any) => console.log(item))

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
