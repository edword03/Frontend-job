import React from 'react';
import styled from 'styled-components';

const OptionItemBlock = styled.li`
  &:not(:first-child) {
    margin-top: 5px;
  }

  & label {
    display: flex;
    align-items: center;
  }
`;

interface OptionProps {
  id: string;
  value: string;
  title: string;
  onChangeRadio?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const OptionItem: React.FC<OptionProps> = ({ id, value, title, onChangeRadio }) => {

  return (
    <OptionItemBlock>
      <input
        id={id}
        name={`radio${id}`}
        type="radio"
        value={value}
        checked={value === title}
        onChange={onChangeRadio}
      />
      <label style={{ cursor: 'pointer' }} htmlFor={id}>
        <span>{value}</span>
      </label>
    </OptionItemBlock>
  );
};
