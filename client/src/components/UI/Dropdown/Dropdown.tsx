import React, { useState, useEffect, useRef } from 'react';
import { DropDown, InputContainer } from '@styles/common';
import { OptionItem } from '../OptionItem';

interface IPropsTypes {
  imageSrc?: string;
  options: Array<{ id: string; value: string }>;
  onChangeStateValue: (id: string) => void;
}

export const Dropdown: React.FC<IPropsTypes> = ({ imageSrc, options, onChangeStateValue }) => {
  const [isVisivleDropdown, setIsVisivleDropdown] = useState<true | false>(false);
  const [titleSelect, setTitleSelect] = useState<string>(options[0].value);

  const showDropDown = () => setIsVisivleDropdown(prev => !prev);

  const onChangeRadio = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChangeStateValue(evt.target.id);
    setTitleSelect(evt.target.value);
    setIsVisivleDropdown(false);
  };

  const inputRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (inputRef?.current && !inputRef?.current?.contains(e.target as Node)) {
        setIsVisivleDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isVisivleDropdown]);

  return (
    <InputContainer onClick={showDropDown} ref={inputRef}>
      <img src={imageSrc} alt="" />
      <span>{titleSelect}</span>
      {isVisivleDropdown && (
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
