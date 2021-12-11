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
  flex-direction: column;
  margin-bottom: 15px;
  cursor: pointer;
  position: relative;
`;

export const ItemContentBlock = styled.div`
  display: flex;
  align-items: stretch;
`;

export const CompanyLogo = styled.img`
  max-width: 68px;
  height: auto;
  border-radius: 10px;
`;

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

export const KeySkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`;
export const KeySkillsItem = styled.span`
  background: #f7f8f9;
  border-radius: 4px;
  font-weight: bold;
  font-size: 9px;
  line-height: 11px;
  color: #95a5b2;
  padding: 5px 8px;
  margin-right: 5px;
  margin-top: 5px;
`;
export const VacancyFlagActive = styled.div`
  background: ${({ theme }) => theme.secondary};
  border-radius: 10px 0px 0px 10px;
  width: 11px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

export const LikeIcon = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

export const DateCreate = styled.span`
  color: #a1aeb9;
  font-weight: 500;
  font-size: 9px;
  align-self: flex-end;
`;
