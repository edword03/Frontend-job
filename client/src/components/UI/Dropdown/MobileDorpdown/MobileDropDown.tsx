import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { Button, DropDown, Input } from '@styles/common';
import { employment, scheduleOptions, experience } from '@constants/index';
import { useMedia } from '@hooks/useMedia';
import { OptionSection } from './OptionSection';
import { divideNumberByPieces } from '@utils/index';

const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;

const SalaryBlock = styled.div``;

const SalaryMobile = styled(Input)`
  margin-top: 12px;
  display: block;
  border: 1px solid #9aaab5;
  border-radius: 5px;
  padding: 8px 12px;

  max-width: 100%;
`;

interface MobileDropDownProps {
  onChangeEmployment: (id: string) => void;
  onChangeShedule: (id: string) => void;
  onChangeExperience: (id: string) => void;
  salary: string;
  onChangeSalary: (value: string) => void;
}

export const MobileDropDown: React.FC<MobileDropDownProps> = ({
  onChangeShedule,
  onChangeEmployment,
  onChangeExperience,
  salary,
  onChangeSalary,
}) => {
  const { isMobile } = useMedia();
  const [, setParams] = useSearchParams()

  const resetParams = (e: React.FormEvent) => {
    setParams('')
  }

  return (
    <DropDown onClick={evt => evt.stopPropagation()}> 
      <DropdownContainer>
        <div>
          {isMobile && (
            <SalaryBlock>
              <span>Доход</span>
              <SalaryMobile
                value={divideNumberByPieces(salary)}
                onChange={e =>
                  onChangeSalary(e.target.value.replace(/\s+/g, '').replace(/[^0-9]/g, ''))
                }
                maxLength={7}
              />
            </SalaryBlock>
          )}
          <OptionSection
            options={scheduleOptions}
            onChange={onChangeShedule}
            optionTitle="График работы"
            queryParam='schedule'
          />
          <OptionSection
            options={employment}
            onChange={onChangeEmployment}
            optionTitle="Тип занятости"
            queryParam='employment'
          />
          <OptionSection
            options={experience}
            onChange={onChangeExperience}
            optionTitle="Опыт работы"
            queryParam='experience'
          />
        <Button outlined style={{marginTop: '20px'}} onClick={resetParams}>Сбросить фильтр</Button>
        </div>
      </DropdownContainer>
    </DropDown>
  );
};
