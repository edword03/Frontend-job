import React from 'react';
import { SearchBarWrap, Input, DropDown, InputContainer } from './SearchBar.styles';
import Location from '@assets/img/svg/Location.svg';
import LocationIcon from '@assets/img/svg/Location.svg';
import TimeIcon from '@assets/img/svg/Time-icon.svg';
import {queryParamsVar} from '../../cache'

interface IProps {
  refetch: () => void;
  setCityVariable: (id: string) => void;
}

export const SearchBar: React.FC<IProps> = ({ refetch, setCityVariable }) => {
  const [isVisivleDropdown, setIsVisivleDropdown] = React.useState<true | false>(false);
  const [input, setInput] = React.useState('');
  const [cityId, setCityId] = React.useState('1');

  const showDropDown = () => {
    setIsVisivleDropdown(prev => !prev);
  };

  const searchCity = React.useCallback(async () => {
    const request = await fetch(`https://api.hh.ru/suggests/areas?text=${input || 'Москва'}`);

    if (!request.status) {
      throw new Error('Error to fetching');
    }
    const data = await request.json();
    console.log(data);

    return data;
  }, [input]);

  console.log();

  React.useEffect(() => {
    async function setCity() {
      const data = await searchCity();

      data.items ? setCityId(data.items[0].id) : setCityId('1');
    }
    setCity();
  }, [searchCity]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { city: cityId };
    setCityVariable(cityId);
    queryParamsVar(body)
    await refetch();
  };

  return (
    <SearchBarWrap onSubmit={onSubmit}>
      <InputContainer img={Location}>
        <img src={LocationIcon} alt="" />
        <Input value={input} onChange={e => setInput(e.target.value)} />
      </InputContainer>
      <InputContainer onClick={showDropDown}>
        <img src={TimeIcon} alt="" />
        <span>Гибкий график</span>
        {isVisivleDropdown && (
          <DropDown onClick={(e) => {
           
            e.stopPropagation()
          }}>
            <div>
              <input id="full-time" name='radio' type="radio" checked />
              <label htmlFor="full-time">
                <span>Полный день</span>
              </label>
            </div>
            <div>
              <input id="partTime" name='radio' type="radio" />
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
