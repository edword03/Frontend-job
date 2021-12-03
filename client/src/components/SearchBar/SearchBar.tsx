import React from 'react';
import { SearchBarWrap, Input, DropDown, InputContainer } from './SearchBar.styles';
import Location from '@assets/img/svg/Location.svg';
import LocationIcon from '@assets/img/svg/Location.svg';
import TimeIcon from '@assets/img/svg/Time-icon.svg';

export const SearchBar = () => {
  const [isVisivleDropdown, setIsVisivleDropdown] = React.useState<true | false>(false);
  const [input, setInput] = React.useState('')
  const [cityId, setCityId] = React.useState('1')

  const showDropDown = () => {
    setIsVisivleDropdown(true);
  };

  const searchCity = React.useCallback(async() => {
    const request = await fetch(`https://api.hh.ru/suggests/areas?text=${input || 'Москва'}`)

    if (!request.status) {
      throw new Error('Error to fetching')
    }
    const data = await request.json()
    console.log(data);

    return data
  }, [input])

  console.log();
 
  React.useEffect(() => {
    async function setCity(){
      const data = await searchCity()

      data.items ? setCityId(data.items[0].id) : setCityId('1') 
    }
    setCity()
  }, [searchCity])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = {city: cityId}
 
    fetch('http://localhost:4000', {
      method: 'POST',
      // mode: 'no-cors',
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      // credentials: "same-origin",
    })
    .then(res => console.log(res))

  }


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
      <button>click</button>
    </SearchBarWrap>
  );
};
