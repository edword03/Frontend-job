import React from 'react';
import { VacancyItem, ItemContentBlock, ItemSubtitle, ItemTitle, CompanyLogo } from './Main.styles';

interface IItemProps {
  title?: string;
  company?: string;
  city?: string;
  logo?: string;
}

export const VacancyItemComponent: React.FC<IItemProps> = ({ title, company, city, logo }) => {
  return (
    <VacancyItem>
      <div>
        <CompanyLogo src={logo || ''} alt="logo" />
      </div>
      <ItemContentBlock>
        <div>
          <ItemSubtitle>{company}</ItemSubtitle>
          <ItemTitle>{title}</ItemTitle>
          <ItemSubtitle>{city ? city: ''}</ItemSubtitle>
        </div>
      </ItemContentBlock>
    </VacancyItem>
  );
};
