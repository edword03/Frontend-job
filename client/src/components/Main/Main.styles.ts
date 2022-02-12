import styled from 'styled-components';

export const Main = styled.main`
  display: flex;

  @media screen and (max-width: 1024px) {
    justify-content: center;
    position: relative;
  }

`;

export const VacanciesBlock = styled.div`
  max-width: 460px;
  width: 100%;
  position: sticky;
  height: 100vh;
  overflow-y: scroll;
  top: 0;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.secondary};
    border: 3px solid transparent;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  @media screen and (max-width: 1024px) {
    max-width: none;
  }
`;


export const PaginationItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 32px;
`;

export const PaginationItem = styled.button`
  padding: 8px 12px;
  background-color: ${props => props.theme.secondary};
  border-radius: 3px;
  color: ${props => props.theme.white};
  font-size: 13px;

  &:active {
    background-color: #0070fb8c;
    transition: 0.3s;
  }
`;
