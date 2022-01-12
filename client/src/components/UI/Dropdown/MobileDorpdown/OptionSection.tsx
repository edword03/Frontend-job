import React, { useState } from 'react';
import styled from 'styled-components';
import { OptionItem } from '@components/UI/OptionItem';

const SelectTitle = styled.span`
  margin-bottom: 10px;
  display: block;
`;

const OptionSectionBlock = styled.section`
  margin-top: 25px;
`;

interface OptionProps {
  options: Array<any>;
  onChange: (id: string) => void;
  optionTitle: string;
}

export const OptionSection: React.FC<OptionProps> = ({ options, onChange, optionTitle }) => {
  const [value, setValue] = useState(options[0].value);

  const onChangeValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
    onChange(evt.target.id);
  };

  return (
    <OptionSectionBlock>
      <SelectTitle>{optionTitle}</SelectTitle>
      {options &&
        options.map(item => (
          <OptionItem
            key={item.id}
            id={item.id}
            value={item.value}
            title={value}
            onChangeRadio={onChangeValue}
          />
        ))}
    </OptionSectionBlock>
  );
};
