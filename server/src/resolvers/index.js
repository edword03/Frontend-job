import fetch from 'node-fetch';

export const resolvers = {
  Query: {
    vacancies: async (root, {city}, { dataSources }) => {
      return dataSources.api.getVacancies(city);
    },
    vacancyItem: async(_, {id}, {dataSources}) => {
      return dataSources.api.getVacancyItem(id)
    }
  },
};
