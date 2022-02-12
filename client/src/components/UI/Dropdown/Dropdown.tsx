import React, { useState, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { DropDown, InputContainer } from '@styles/common';
import { serializeQuery, deserializeQuery } from '@utils/index';
import { OptionItem } from '../OptionItem';
import { useOutsideClick } from '@hooks/index';

interface IPropsTypes {
  imageSrc?: string;
  options: Array<{ id: string; value: string }>;
  queryParam: string;
  onChangeStateValue: (id: string) => void;
}

export const Dropdown: React.FC<IPropsTypes> = ({
  imageSrc = '',
  options,
  onChangeStateValue,
  queryParam = '',
}) => {
  const [param, setParams] = useSearchParams();
  const title = options.find(item => item.id === param.get(queryParam));
  const { search } = useLocation();
  const [titleSelect, setTitleSelect] = useState<string>(title?.value || options[0].value);

  const inputRef = useRef<HTMLDivElement | null>(null);
  const { isVisible, setIsVisible } = useOutsideClick(inputRef);

  const showDropDown = () => setIsVisible(prev => !prev);

  const onChangeRadio = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChangeStateValue(evt.target.id);

    let param = deserializeQuery(search);

    const serializeParam = serializeQuery({ ...param, [queryParam]: evt.target.id });
    setParams(serializeParam);

    setTitleSelect(evt.target.value);
    setIsVisible(false);
  };

  return (
    <InputContainer onClick={showDropDown} ref={inputRef}>
      <img src={imageSrc} alt="" />
      <span>{titleSelect}</span>
      {isVisible && (
        <DropDown onClick={e => e.stopPropagation()}>
          {options &&
            options.map(item => (
              <OptionItem
                key={item.id}
                id={item.id}
                value={item.value}
                title={titleSelect}
                onChangeRadio={onChangeRadio}
              />
            ))}
        </DropDown>
      )}
    </InputContainer>
  );
};
