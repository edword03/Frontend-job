import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { GlobalStyle, Theme } from '@styles/style.d';
import { Header } from '..';
import { ErrorPage, FeaturedJobs, Home, SearchJobs, CompanyPage, VacancyPage } from '@pages/index';

export const App = () => {
  return (
    <ThemeContext.Provider value={Theme}>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="jobs/*" element={<SearchJobs />}>
          <Route path=":id" element={<SearchJobs />} />
        </Route>
        <Route path="featured-jobs/*" element={<FeaturedJobs />}>
          <Route path=":id" element={<FeaturedJobs />} />
        </Route>
        <Route path='companies/*'>
          <Route path=':id/*' element={<CompanyPage />} />
          <Route path=':id/vacancies/:job' element={<VacancyPage />}/>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </ThemeContext.Provider>
  );
};
