import React from 'react';
import { Container } from '@components/UI/Container';
import { VacanciesBlock } from './Main.styles';
import { VacancyItemComponent } from './VacancyItem';

import Job1 from '@assets/img/job-1.png';
import Job2 from '@assets/img/job-2.png';
import Job3 from '@assets/img/job-3.png';
import Job4 from '@assets/img/job-4.png';

const jobList = [
  {
    title: 'Front-end Разработчиĸ',
    company: 'Интернет Люди',
    city: 'Москва',
    logo: Job1,
  },
  {
    title: 'React Developer (Middle/Senior)',
    company: 'GOOD CALL DEVELOPMENT',
    city: 'Москва',
    logo: Job2,
  },
  {
    title: 'Frontend developer (React)',
    company: 'Winfinity',
    city: 'Москва',
    logo: Job3,
  },
  {
    title: 'Frontend developer',
    company: 'Diagnocat',
    city: 'Москва',
    logo: Job4,
  },
];

interface IFetch {}

export const Main = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    async function getVacancies() {
      const res = await fetch('https://api.hh.ru/vacancies?text=Frontend');
      const data = await res.json();
      setData(data.items);
    }

    // getVacancies();
  }, []);
  console.log(data);
  return (
    <>
      <VacanciesBlock>
        d
        {data ? (
          data.map((item: any) => (
            <VacancyItemComponent
              key={Math.random() * 2525}
              title={item.name}
              logo={item.employer.logo_urls ? item.employer.logo_urls.original : ''}
              company={item.employer.name} 
              city={item.address ? item.address.city: ''}
            />
          ))
        ) : (
          <p>Вакансии не найдены</p>
        )}
      </VacanciesBlock>
    </>
  );
};
