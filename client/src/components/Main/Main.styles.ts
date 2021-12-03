import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
`;

export const VacanciesBlock = styled.div`
  max-width: 460px;
  position: relative;
`;

export const VacancyItem = styled.div`
  background-color: ${props => props.theme.white};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 10px;
  padding: 20px;
  display: flex;
  margin-bottom: 15px;
  cursor: pointer;
`;

export const ItemContentBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
`;

export const CompanyLogo = styled.img`
  width: 68px;
  height: 49px;
`;

// export const ItemContentHead = styled.div`

// `

export const ItemSubtitle = styled.span`
  font-weight: bold;
  font-size: 9px;
  line-height: 11px;
  color: #95a5b2;
`;

export const ItemTitle = styled.h2`
  font-size: 14px;
  line-height: 17px
  color: ${props => props.theme.black};
  margin: 5px 0 5px;
`;

export const EmptyLogo = styled.div`
  background: #f7f8f9;
  border-radius: 10px;
  width: 68px;
  height: 49px;
`;
