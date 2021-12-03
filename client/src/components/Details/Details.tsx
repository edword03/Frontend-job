import React from 'react';
import { DetailsBlock, DetailsHead } from './Details.styles';
import { Portal } from '@components/Portal';

interface IDetailsProps {
  id: string | undefined;
  title?: string;
}

export const Details: React.FC<IDetailsProps> = ({ id, title }) => {
  const [info, setInfo] = React.useState({});

  const getInfoAboutVacancy = async (id: string | undefined) => {
    const responsive = await fetch(`https://api.hh.ru/vacancies/${id}`);
    const data = await responsive.json();
    // setInfo(data);
    console.log(data);
  };

  React.useEffect(() => {
    getInfoAboutVacancy(id);
  }, [id]);

  return (
    <Portal>
      <DetailsBlock>
        <DetailsHead>
          {title}
        </DetailsHead>
      </DetailsBlock>
    </Portal>
  );
};
