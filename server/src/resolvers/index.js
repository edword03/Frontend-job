import fetch from 'node-fetch';

export const resolvers = {
  Query: {
    vacancies: async (root, {city, page}, { dataSources }) => {
      return dataSources.api.getVacancies(city, page);
    },
    vacancyItem: async(_, {id}, {dataSources}) => {
      return dataSources.api.getVacancyItem(id)
    },
    cityId: async(_, {city}, {dataSources}) => {
      return dataSources.api.getCityId(city)
    }
  },
};
