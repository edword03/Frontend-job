import React from 'react';
import { SearchBarWrap, Input, DropDown, InputContainer } from './SearchBar.styles';
import Location from '@assets/img/svg/Location.svg';
import LocationIcon from '@assets/img/svg/Location.svg';
import TimeIcon from '@assets/img/svg/Time-icon.svg';

export const SearchBar = () => {
  const [isVisivleDropdown, setIsVisivleDropdown] = React.useState<true | false>(false);

  const showDropDown = () => {
    setIsVisivleDropdown(true);
  };

  return (
    <SearchBarWrap>
      <InputContainer img={Location}>
        <img src={LocationIcon} alt="" />
        <Input />
      </InputContainer>
      <InputContainer onClick={showDropDown}>
        <img src={TimeIcon} alt="" />
        <span>Гибкий график</span>
        {isVisivleDropdown && (
          <DropDown>
            <ul>
              <li>
                <label htmlFor="full-time">
                  <input id="full-time" type="radio" />
                </label>
                <span>Полный день</span>
              </li>
              <li>
                <input type="radio" />
                <span>Полный день</span>
              </li>
              <li>
                <input type="radio" />
                <span>Полный день</span>
              </li>
            </ul>
          </DropDown>
        )}
      </InputContainer>
    </SearchBarWrap>
  );
};
