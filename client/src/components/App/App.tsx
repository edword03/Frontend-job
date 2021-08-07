import React from 'react';
import { Header, Container } from '@components/index';
import styled, { ThemeContext } from 'styled-components';
import { GlobalStyle, Theme } from '@styles/style.d';
import { FeaturedJobs, SearchJobs } from '@pages/index';
import { getCity } from '@services/api'


type CurrenPageType = 'searchPage' | 'featuredPage';


interface ICity {
  name: string;
  id: number;
}



export const App = () => {
  const [currentPage, setCurrenPage] = React.useState<CurrenPageType>('searchPage');
  const [data, setData] = React.useState({});

  const setCites = (name: string, id: number) => {
    const obj: ICity = {
      name,
      id,
    };
    setData(() => obj);
  };

  // React.useEffect(() => {
  //   setData(getCity().then(data => console.log(data)))
  //   fetch('https://api.hh.ru/vacancies/')
  // }, [])
  
  console.log(data);
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
