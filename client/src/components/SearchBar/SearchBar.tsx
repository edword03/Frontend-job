import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { SearchBarWrap, Input, DropDown, InputContainer } from './SearchBar.styles';
import Location from '@assets/img/svg/Location.svg';
import LocationIcon from '@assets/img/svg/Location.svg';
import TimeIcon from '@assets/img/svg/Time-icon.svg';
import { queryParamsVar } from '@cache/index';

interface IProps {
  refetch: () => void;
}

const CIDY_ID = gql`
  query CityId($city: String) {
    cityId(city: $city) {
      items {
        id
        url
        text
      }
    }
  }
`;

export const SearchBar: React.FC<IProps> = ({ refetch }) => {
  const [isVisivleDropdown, setIsVisivleDropdown] = React.useState<true | false>(false);
  const [input, setInput] = React.useState('');

  const {data} = useQuery(CIDY_ID, {
    variables: {city: input}
  })
  const [cityId, setCityId] = React.useState('');

  const showDropDown = () => {
    setIsVisivleDropdown(prev => !prev);
  };

  const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setCityId(data && data.cityId.items[0].id)
    console.log(cityId);
  }


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { city: cityId };
    queryParamsVar(body);
    await refetch();
  };

  return (
    <SearchBarWrap onSubmit={onSubmit}>
      <InputContainer img={Location}>
        <img src={LocationIcon} alt="" />
        <Input value={input} onChange={onChangeCity} />
      </InputContainer>
      <InputContainer onClick={showDropDown}>
        <img src={TimeIcon} alt="" />
        <span>Гибкий график</span>
        {isVisivleDropdown && (
          <DropDown
            onClick={e => {
              e.stopPropagation();
            }}>
            <div>
              <input id="full-time" name="radio" type="radio" checked />
              <label htmlFor="full-time">
                <span>Полный день</span>
              </label>
            </div>
            <div>
              <input id="partTime" name="radio" type="radio" />
              <label htmlFor="partTime">
                <span>Частичная занятость</span>
              </label>
            </div>
            <div>
              <input type="radio" />
              <span>Полный день</span>
            </div>
          </DropDown>
        )}
      </InputContainer>
      <button>click</button>
    </SearchBarWrap>
  );
};
