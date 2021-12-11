import React from 'react';
import {
  VacancyItem,
  ItemContentBlock,
  ItemSubtitle,
  ItemTitle,
  CompanyLogo,
  EmptyLogo,
  KeySkillsItem,
  KeySkills,
  VacancyFlagActive,
  LikeIcon as LikeIconBlock,
  DateCreate,
} from './Main.styles';
import { LikeIcon } from '@components/UI/LikeIcon';
import { gql, useQuery } from '@apollo/client';
import { favoriteVacanciesVar, isVisibleVar, vacancyIdVar } from '@cache/index';

interface IItemProps {
  title: string;
  city: string;
  id: string;
}

const VACANCY_ITEM = gql`
  query Item($id: ID) {
    vacancyItem(id: $id) {
      id
      name
      key_skills {
        name
      }
      employer {
        name
        logo_urls {
          original
          _90
          _240
        }
      }
      created_at
    }
  }
`;

const VACANCY_ID = gql`
  query ItemId {
    vacancyId @client
  }
`;

export const VacancyItemComponent: React.FC<IItemProps> = ({ title, city, id }) => {
  const { data } = useQuery(VACANCY_ITEM, {
    variables: { id },
  });
  const [isActive, setIsActive] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const idItem = useQuery(VACANCY_ID);
  const dateCreated = data && data.vacancyItem && data.vacancyItem.created_at;
  const formatDate = new Date(dateCreated).toLocaleDateString('en-GB');

  const logo = data && data.vacancyItem && data.vacancyItem.employer && data.vacancyItem.employer.logo_urls && data.vacancyItem.employer.logo_urls.original
  const companyName = data && data.vacancyItem && data.vacancyItem.employer && data.vacancyItem.employer.name

  React.useEffect(() => {
    if (idItem.data.vacancyId === id) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }

    if (favoriteVacanciesVar().some(item => item.id === id)) {
      setIsLiked(true)
    }

    return () => {
      setIsActive(false);
    }
  }, [id, idItem.data.vacancyId]);

  const onDetailsInfo = () => {
    isVisibleVar(true);
    vacancyIdVar(id);
  };
  const onToggleLike = () => {
    setIsLiked(prevState => !prevState);
    const newFavoriteVacancy = { title, city, logo, id };
    const isFavorite = favoriteVacanciesVar().some(item => item.id === id)

    if (!isFavorite) {
      favoriteVacanciesVar([newFavoriteVacancy, ...favoriteVacanciesVar()]);
    } else {
      favoriteVacanciesVar([...favoriteVacanciesVar()].filter(item => item.id !== id))
    }
  };

  return (
    <>
      <VacancyItem id={`item-${id}`} onClick={onDetailsInfo}>
        {isActive && <VacancyFlagActive />}
        <ItemContentBlock>
          <div style={{ marginRight: '15px' }}>
            {logo ? <CompanyLogo src={logo} alt="logo" /> : <EmptyLogo />}
          </div>
          <div style={{ maxWidth: 290 }}>
            <ItemSubtitle>{companyName}</ItemSubtitle>
            <ItemTitle>{title}</ItemTitle>
            <ItemSubtitle>{city}</ItemSubtitle>

            <KeySkills>
              {data &&
                data.vacancyItem.key_skills.map((item: any) => (
                  <KeySkillsItem key={Math.random() * 255}>{item.name}</KeySkillsItem>
                ))}
            </KeySkills>
          </div>
          <LikeIconBlock onClick={e => e.stopPropagation()}>
            <div>
              <LikeIcon isActive={isLiked} onToggle={onToggleLike} />
            </div>
            <DateCreate>{formatDate}</DateCreate>
          </LikeIconBlock>
        </ItemContentBlock>
      </VacancyItem>
    </>
  );
};
