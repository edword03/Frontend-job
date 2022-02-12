export const resolvers = {
  Query: {
    vacancies: async (
      root,
      { city, page, schedule, employment, experience, salary, currency },
      { dataSources },
    ) => {
      return dataSources.api.getVacancies(
        city,
        page,
        schedule,
        employment,
        experience,
        salary,
        currency,
      );
    },
    vacancyItem: async (_, { id }, { dataSources }) => {
      return dataSources.api.getVacancyItem(id);
    },
    cityId: async (_, { city }, { dataSources }) => {
      return dataSources.api.getCityId(city);
    },
    companies: async (_, {}, { dataSources }) => {
      return dataSources.api.getCompanies();
    },
    companyItem: async (_, { id }, { dataSources }) => {
      return dataSources.api.getCompanyItem(id);
    },
    vacanciesCompany: async (_, { id }, { dataSources }) => {
      return dataSources.api.getVacanciesCompany(id);
    },
  },
};
