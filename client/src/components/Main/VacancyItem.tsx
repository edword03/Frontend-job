import React, { ReactNode, ReactText } from 'react';
import { VacancyItem, ItemContentBlock, ItemSubtitle, ItemTitle, CompanyLogo, EmptyLogo } from './Main.styles';
import { Details } from '@components/Details/Details';
import { Portal } from '@components/Portal';

interface IItemProps {
  title?: string;
  company?: string;
  city?: string | null;
  logo?: string;
  id?: string;
}

export const VacancyItemComponent: React.FC<IItemProps> = ({ title, company, city, logo, id }) => {
  const [visible, setVisible] = React.useState(false);
  const refC = React.useRef(null);

  const openInfo = () => {
    setVisible(prevState => !prevState);
  };

  React.useEffect(() => {
    const id = document.getElementById('vacancyClick');
    id && id.addEventListener('click', (e: MouseEvent) => {
      if (e.target !== refC.current) {
        setVisible(false)
      }
    });
    return () => {
      id && id.addEventListener('click', (e: MouseEvent) => {
      if (e.target !== refC.current) {
        setVisible(false)
      }
    });
    }
  }, []);
  return (
    <>
      <VacancyItem onClick={openInfo} ref={refC}>
        <div>
          {logo ? <CompanyLogo src={logo} alt="logo" />: <EmptyLogo />}
        </div>
        <ItemContentBlock>
          <div>
            <ItemSubtitle>{company}</ItemSubtitle>
            <ItemTitle>{title}</ItemTitle>
            <ItemSubtitle>{city}</ItemSubtitle>
          </div>
        </ItemContentBlock>
        {visible && <Details id={id} title={title} />}
      </VacancyItem>
    </>
  );
};
