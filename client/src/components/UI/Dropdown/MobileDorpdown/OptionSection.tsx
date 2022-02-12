import React, { useState, useCallback, useMemo } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { OptionItem } from '@components/UI/OptionItem';
import { deserializeQuery, serializeQuery } from '@utils/index';

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
  queryParam: string;
}

export const OptionSection: React.FC<OptionProps> = ({
  options,
  onChange,
  optionTitle,
  queryParam,
}) => {
  const [params, setParams] = useSearchParams();
  const title = options.find(item => item.id === params.get(queryParam));
  const [value, setValue] = useState(title?.value || options[0].value);
  const {search} = useLocation()

  const serializedQuery = useMemo(() => {
    return  deserializeQuery(search)
  }, [search])

  const onChangeValue = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
    onChange(evt.target.id);
    

    setParams(serializeQuery({...serializedQuery, [queryParam]: evt.target.id }));
  }, [onChange, queryParam, setParams, serializedQuery])

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
