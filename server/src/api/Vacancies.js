import { RESTDataSource } from 'apollo-datasource-rest';

export class Vacancies extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.hh.ru/';
  }

  async getVacancies(city = '1') {
    return await this.get(`vacancies`, {
      text: 'frontend',
      area: city || '1'
    });
  }

  async getVacancyItem(id) {
    return await this.get(`vacancies/${id}`)
  }
}
