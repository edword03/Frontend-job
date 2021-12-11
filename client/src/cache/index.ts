import { InMemoryCache, makeVar } from '@apollo/client';

interface IFavoriteVacanciesType {
  title: string;
  city: string;
  logo: string;
  id: string;
}

interface IQueryType {
  city?: string
}

export const isVisibleVar = makeVar<boolean>(false);
export const vacancyIdVar = makeVar<string>('');
export const favoriteVacanciesVar = makeVar<Array<IFavoriteVacanciesType>>([]);
export const queryParamsVar = makeVar<IQueryType>({});

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isVisible: {
          read() {
            return isVisibleVar();
          },
        },
        vacancyId: {
          read() {
            return vacancyIdVar();
          },
        },
        favoriteVacancies: {
          read() {
            return favoriteVacanciesVar();
          },
        },
        queryParams: {
          read() {
            return queryParamsVar();
          },
        },
      },
    },
  },
});