import React from 'react';
import { Header, Container } from '@components/index';
import styled, { ThemeContext } from 'styled-components';
import { GlobalStyle, Theme } from '@styles/style.d';
import { FeaturedJobs, SearchJobs } from '@pages/index';

type CurrenPageType = 'searchPage' | 'featuredPage';

type SnippetsType = {
  snippet: {
    requirement: string
    responsibility: string
  }
}

type DataType = {
  snippet: Array<SnippetsType> | never
}

export const App = () => {
  const [currentPage, setCurrenPage] = React.useState<CurrenPageType>('searchPage');
  const [data, setData] = React.useState([])

  const getApi = async(employment: string, experience: string ) => {
    const res = await (await fetch(`https://api.hh.ru/vacancies`)).json()
    const res2 = await (await fetch('https://api.hh.ru/suggests/areas')).json()
    setData(res.items)
  }

  React.useEffect(() => {

    getApi('full', 'between1And3')
    console.log(data);
  }, [])


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
      <Container>
        {currentPage === 'searchPage' ? <SearchJobs /> : <FeaturedJobs />}
      </Container>
    </ThemeContext.Provider>
  );
};
