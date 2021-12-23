import styled from 'styled-components';

export const OptionItem = styled.li`
  &:not(:first-child) {
    margin-top: 5px;
  }

  & label {
    display: flex;
    align-items: center;
  }

  & label:hover {
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.white};
  }
`;
