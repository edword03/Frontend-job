import { RESTDataSource } from 'apollo-datasource-rest';

export class Vacancies extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.hh.ru/';
  }

  async getVacancies(city, page) {
    return await this.get(`vacancies`, {
      text: 'frontend',
      area: city || '1',
      page: page || '0',
      per_page: '50'
    });
  }

  async getVacancyItem(id) {
    return await this.get(`vacancies/${id}`)
  }

  async getCityId(name = 'Москва') {
    return await this.get(`suggests/areas?text=${name}`)
  }
}
