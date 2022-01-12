import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  SearchBarWrap,
  SubmitButton,
  SalaryBlock,
  CityInputBlock,
  Currency,
} from './SearchBar.styles';
import LocationIcon from '@assets/img/svg/Location.svg';
import TimeIcon from '@assets/img/svg/Time-icon.svg';
import EmploymentIcon from '@assets/img/svg/employment.svg';
import StarIcon from '@assets/img/svg/star.svg';
import { queryParamsVar } from '@cache/index';
import { Dropdown } from '@components/UI/Dropdown/Dropdown';
import { DropDown, Input, InputContainer } from '@styles/common';
import { currency, employment, experience, scheduleOptions } from '@constants/index';
import { useMedia } from '@hooks/useMedia';
import { MobileDropDown } from '@components/UI/Dropdown/MobileDorpdown/MobileDropDown';
import { divideNumberByPieces } from '@utils/index';

interface IProps {
  refetch: () => void;
}

interface ICityItem {
  id: string;
  text: string;
}

interface IDataTypes {
  cityId: {
    items: Array<ICityItem>;
  };
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
  const [isSearchList, setIsSearchList] = React.useState<true | false>(false);
  const [input, setInput] = React.useState('');
  const [scheduleId, setSchedule] = React.useState('');
  const [employmentId, setEmployment] = React.useState('');
  const [experienceId, setExperience] = React.useState('');
  const [salary, setSalary] = React.useState<string>('');
  const [currencyCode, setCurrencyCode] = React.useState('RUR');

  const { isDesktop, isMobile } = useMedia();

  const { data } = useQuery<IDataTypes>(CIDY_ID, {
    variables: { city: input },
  });
  const [cityId, setCityId] = React.useState('');

  const cityItemId =
    data && data.cityId && data.cityId.items && data.cityId.items[0] && data.cityId.items[0].id;

  const showDropDown = () => {
    setIsVisivleDropdown(prev => !prev);
  };

  const onClickCityItem = (e: React.MouseEvent) => {
    if (e.currentTarget.textContent) {
      setInput(e.currentTarget.textContent);
      setIsSearchList(false)
    }
  };

  const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.trim());
    if (e.target.value.length > 2) {
      setIsSearchList(true);
      if (cityItemId) {
        setCityId(cityItemId);
      } else {
        setCityId('');
      }
    } else {
      setIsSearchList(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      city: cityId,
      schedule: scheduleId,
      employment: employmentId,
      experience: experienceId,
      salary,
      currency: currencyCode,
    };
    console.log(body);
    queryParamsVar(body);

    if (!isDesktop) {
      setIsVisivleDropdown(false)
    }
    await refetch();
  };

  return (
    <SearchBarWrap onSubmit={onSubmit}>
      <CityInputBlock>
        <img src={LocationIcon} alt="" />
        <Input value={input} onChange={onChangeCity} placeholder="Поиск города" />
        {isSearchList && (
          <DropDown>
            {data &&
              data.cityId &&
              data.cityId.items.map(item => (
                <li onClick={onClickCityItem} key={item.id} style={{ marginTop: 5 }}>
                  {item.text}
                </li>
              ))}
            {data && data.cityId && data.cityId.items.length === 0 && <li>Ничего не найдено</li>}
          </DropDown>
        )}
      </CityInputBlock>
      {isDesktop && (
        <>
          <Dropdown
            imageSrc={TimeIcon}
            options={scheduleOptions}
            onChangeStateValue={setSchedule}
          />
          <Dropdown
            imageSrc={EmploymentIcon}
            options={employment}
            onChangeStateValue={setEmployment}
          />
          <Dropdown imageSrc={StarIcon} options={experience} onChangeStateValue={setExperience} />
        </>
      )}
      {!isMobile && (
        <SalaryBlock>
          <img src={LocationIcon} alt="" />
          <Input
            value={divideNumberByPieces(salary)}
            onChange={e => setSalary(e.target.value.replace(/\s+/g, '').replace(/[^0-9]/g, ''))}
            autoComplete="none"
            type="text"
            maxLength={7}
          />
          <label style={{ position: 'absolute', left: 118 }}>
            <Currency onChange={e => setCurrencyCode(e.target.value)} value={currencyCode}>
              {currency.map(item => (
                <option key={item.code} value={item.code}>
                  {item.abbr}
                </option>
              ))}
            </Currency>
          </label>
        </SalaryBlock>
      )}
      {!isDesktop && (
        <>
          <InputContainer border={!isMobile ? 'left' : undefined} onClick={showDropDown}>
            <span>Фильтры</span>
          </InputContainer>
          {isVisivleDropdown && (
            <MobileDropDown
              onChangeEmployment={setEmployment}
              onChangeShedule={setSchedule}
              onChangeExperience={setExperience}
              salary={salary}
              onChangeSalary={setSalary}
            />
          )}
        </>
      )}
      <SubmitButton>Поиск</SubmitButton>
    </SearchBarWrap>
  );
};
