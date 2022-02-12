import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useSearchParams, useLocation } from 'react-router-dom';
import {
  SearchBarWrap,
  SubmitButton,
  SalaryBlock,
  CityInputBlock,
  Currency,
} from './SearchBar.styles';
import { DropDown, Input, InputContainer } from '@styles/common';

import LocationIcon from '@assets/img/svg/Location.svg';
import TimeIcon from '@assets/img/svg/Time-icon.svg';
import EmploymentIcon from '@assets/img/svg/employment.svg';
import StarIcon from '@assets/img/svg/star.svg';
import SalaryIcon from '@assets/img/svg/salary.svg';

import { queryParamsVar } from '@cache/index';
import { Dropdown } from '@components/UI/Dropdown/Dropdown';
import { currency, employment, experience, scheduleOptions } from '@constants/index';
import { useMedia } from '@hooks/useMedia';
import { MobileDropDown } from '@components/UI/Dropdown/MobileDorpdown/MobileDropDown';
import { divideNumberByPieces, serializeQuery, deserializeQuery } from '@utils/index';
import { useOutsideClick } from '@hooks/useOutsideClick';

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
  const [isSearchList, setIsSearchList] = React.useState<true | false>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = useLocation();

  const [input, setInput] = React.useState('');
  const [scheduleId, setSchedule] = React.useState(searchParams.get('schedule') || '');
  const [employmentId, setEmployment] = React.useState(searchParams.get('employment') || '');
  const [experienceId, setExperience] = React.useState(searchParams.get('experience') || '');
  const [salary, setSalary] = React.useState<string>(searchParams.get('salary') || '');
  const [currencyCode, setCurrencyCode] = React.useState('RUR');

  const { isDesktop, isMobile } = useMedia();

  const dropdownRef = React.useRef(null);
  const { isVisible, setIsVisible } = useOutsideClick(dropdownRef);

  const { data } = useQuery<IDataTypes>(CIDY_ID, {
    variables: { city: input },
  });

  const [cityId, setCityId] = React.useState(searchParams.get('area') || '');

  React.useEffect(() => {
    async function updateQuery() {
      const body = {
        city: cityId,
        schedule: scheduleId,
        employment: employmentId,
        experience: experienceId,
        salary,
        currency: currencyCode,
      };
      queryParamsVar(body);
      await refetch();
    }
    updateQuery()
  }, []);


  const cityItemId =
    data && data.cityId && data.cityId.items && data.cityId.items[0] && data.cityId.items[0].id;

  const showDropDown = () => {
    setIsVisible(prev => !prev);
  };

  const serializeQueryCity = React.useMemo(() => {
    return serializeQuery({...deserializeQuery(search), area: cityItemId})
  }, [cityItemId, search])

  const onClickCityItem = (e: React.MouseEvent) => {
    if (e.currentTarget.textContent) {
      setInput(e.currentTarget.textContent);
      setIsSearchList(false);
      setSearchParams(serializeQueryCity);
    }
  };

  const onChangeCity = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value.trim());
      if (e.target.value.length > 2) {
        setIsSearchList(true);
        if (cityItemId) {
          setTimeout(() => {
            setCityId(cityItemId);
            setSearchParams(serializeQueryCity);
          }, 1000);
        } else {
          setCityId('');
        }
      } else {
        setIsSearchList(false);
      }
    },
    [cityItemId, setSearchParams, serializeQueryCity],
  );

  const onChangeSalary = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      if (parseInt(evt.target.value) > 0) {
        setSalary(evt.target.value.replace(/\s+/g, '').replace(/[^0-9]/g, ''));
        let params = deserializeQuery(search);
        setSearchParams(serializeQuery({ ...params, salary: salary }));
      }
    },
    [salary, setSearchParams, search],
  );

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
    await queryParamsVar(body);

    if (!isDesktop) {
      setIsVisible(false);
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
            queryParam="schedule"
          />
          <Dropdown
            imageSrc={EmploymentIcon}
            options={employment}
            onChangeStateValue={setEmployment}
            queryParam="employment"
          />
          <Dropdown
            imageSrc={StarIcon}
            options={experience}
            onChangeStateValue={setExperience}
            queryParam="experience"
          />
        </>
      )}
      {!isMobile && (
        <SalaryBlock>
          <img src={SalaryIcon} alt="" />
          <Input
            value={divideNumberByPieces(salary)}
            onChange={onChangeSalary}
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
          <InputContainer
            border={!isMobile ? 'left' : undefined}
            onClick={showDropDown}
            ref={dropdownRef}>
            <span>Фильтры</span>
          </InputContainer>
          {isVisible && (
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
