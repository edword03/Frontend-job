import React, { useState, useRef } from 'react';
import { DropDown, InputContainer } from '@styles/common';
import { OptionItem } from '../OptionItem';
import { useOutsideClick } from '@hooks/index';

interface IPropsTypes {
  imageSrc?: string;
  options: Array<{ id: string; value: string }>;
  onChangeStateValue: (id: string) => void;
}

export const Dropdown: React.FC<IPropsTypes> = ({ imageSrc = '', options, onChangeStateValue }) => {
  const [titleSelect, setTitleSelect] = useState<string>(options[0].value);

  const inputRef = useRef<HTMLDivElement | null>(null);
  const { isVisible, setIsVisible } = useOutsideClick(inputRef);

  const showDropDown = () => setIsVisible(prev => !prev);

  const onChangeRadio = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChangeStateValue(evt.target.id);
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
