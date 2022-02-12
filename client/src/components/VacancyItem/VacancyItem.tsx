import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  VacancyItem,
  ItemContentBlock,
  ItemSubtitle,
  ItemTitle,
  CompanyLogo,
  KeySkillsItem,
  KeySkills,
  VacancyFlagActive,
  LikeIcon as LikeIconBlock,
  DateCreate,
  LogoSection,
} from './VacancyItem.styles';
import { LikeIcon } from '@components/UI/LikeIcon';
import { gql, useQuery } from '@apollo/client';
import { favoriteVacanciesVar, isVisibleVar, vacancyIdVar } from '@cache/index';
import { Loader } from '..';
import { useMedia } from '@hooks/useMedia';
import { EmptyLogo } from '@styles/common';
import { DETAILS_INFO } from '../../schemas';

interface IItemProps {
  id: string;
  isHasActive?: boolean;
  path?: string;
  isCompanyVacancy?: boolean;
}


const VACANCY_ID = gql`
  query ItemId {
    vacancyId @client
  }
`;

export const VacancyItemComponent: React.FC<IItemProps> = ({
  id,
  isHasActive,
  path,
  isCompanyVacancy,
}) => {
  const { data, loading } = useQuery(DETAILS_INFO, {
    variables: { id },
  });
  
  const [isActive, setIsActive] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const { search } = useLocation();

  const idItem = useQuery(VACANCY_ID);
  const dateCreated = data && data.vacancyItem && data.vacancyItem.created_at;
  const formatDate = new Date(dateCreated).toLocaleDateString('en-GB');

  const { isMobile, isDesktop } = useMedia();

  const logo =
    data &&
    data.vacancyItem.employer &&
    data.vacancyItem.employer.logo_urls &&
    data.vacancyItem.employer.logo_urls.original;

  const companyName = data && data.vacancyItem && data.vacancyItem.employer.name;
  const title = data && data.vacancyItem && data.vacancyItem.name;
  const city =
    data && data.vacancyItem && data.vacancyItem.address && data.vacancyItem.address.city;

  const isFavorite = React.useMemo(() => favoriteVacanciesVar().some(item => item.id === id), [id]);

  const pathTo = `${path ? path : ''}${id}${search ? search : ''}`;

  const keySkils =
    data &&
    data.vacancyItem.key_skills.map((item: any) => (
      <KeySkillsItem key={Math.random() * 255}>{item.name}</KeySkillsItem>
    ));

  React.useEffect(() => {
    if (idItem.data.vacancyId === id) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    if (isFavorite) {
      setIsLiked(true);
    }

    return () => {
      setIsActive(false);
    };
  }, [id, idItem.data.vacancyId, isFavorite]);

  const onDetailsInfo = React.useCallback(() => {
    isVisibleVar(true);
    vacancyIdVar(id);
  }, [id]);

  const stopEvent = (evt: React.MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
  };

  const onToggleLike = React.useCallback(() => {
    setIsLiked(prevState => !prevState);
    const isFavorite = favoriteVacanciesVar().some(item => item.id === id);

    if (!isFavorite) {
      favoriteVacanciesVar([{ id }, ...favoriteVacanciesVar()]);
    } else {
      favoriteVacanciesVar([...favoriteVacanciesVar()].filter(item => item.id !== id));
    }
  }, [id]);

  if (loading)
    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Loader />
      </div>
    );

  return (
    <>
      <VacancyItem onClick={onDetailsInfo} to={pathTo} $isCompanyVacancy={isCompanyVacancy}>
        {isActive && isDesktop && isHasActive && <VacancyFlagActive />}

        <ItemContentBlock>
          <LogoSection>
            {logo ? <CompanyLogo src={logo} alt="logo" /> : <EmptyLogo />}
            {isMobile && (
              <div onClick={stopEvent}>
                <LikeIcon isActive={isLiked} onToggle={onToggleLike} />
              </div>
            )}
          </LogoSection>

          <div style={{ maxWidth: 290 }}>
            <ItemSubtitle>{companyName}</ItemSubtitle>
            <ItemTitle>{title}</ItemTitle>
            <ItemSubtitle>{city}</ItemSubtitle>
            <KeySkills>{keySkils}</KeySkills>
          </div>

          {!isMobile && (
            <LikeIconBlock onClick={stopEvent}>
              <div>
                <LikeIcon isActive={isLiked} onToggle={onToggleLike} />
              </div>
              <DateCreate>{formatDate}</DateCreate>
            </LikeIconBlock>
          )}
        </ItemContentBlock>
      </VacancyItem>
    </>
  );
};
