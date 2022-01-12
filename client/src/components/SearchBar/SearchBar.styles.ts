import styled from 'styled-components';

export const SearchBarWrap = styled.form`
  margin: 135px 0 42px;
  background: ${({ theme }) => theme.white};
  box-shadow: ${props => props.theme.shadow};
  border-radius: 10px;
  height: 60px;
  position: relative;

  display: flex;
  align-items: center;

  & {
    font-family: Montserrat;
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    color: #49627e;
  }
`;

export const Input = styled.input`
  border: none;
  color: #49627e;
  border-radius: 10px 0 0 10px;
  height: 100%;
  position: relative;
  font-family: Montserrat;
  font-weight: ${props => props.theme.bold};
  font-size: 12px;
  color: #49627e;
  max-width: 95px;
`;

export const SubmitButton = styled.button`
  max-width: 90px;
  width: 100%;
  height: 60px;

  background: #0070fb;
  color: ${props => props.theme.white};
  border-radius: 0px 10px 10px 0px;

  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
`;

export const CityInputBlock = styled.div`
  max-width: 183px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 22px 16px 22px 20px;
  width: 100%;
  cursor: pointer;

  &::after {
    content: '';
    display: block;
    width: 2px;
    height: 100%;
    background-color: #f9f9f9;
    position: absolute;
    right: 0;
  }

  & img {
    padding-right: 20px;
  }
`;

export const SalaryBlock = styled.div`
  max-width: 216px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 22px 16px 22px 20px;
  width: 100%;
  cursor: pointer;

  & img {
    padding-right: 20px;
  }
`;

export const Currency = styled.select`
  border: none;
  color: #49627e;
  font-weight: bold;
  max-width: 55px;
  width: 100%;
  background: ${props => props.theme.white};
  appearance: none;
  cursor: pointer;

  & option:hover {
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.white};
  }
`;
