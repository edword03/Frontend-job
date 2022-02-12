import { RESTDataSource } from 'apollo-datasource-rest';

export class Vacancies extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.hh.ru/';
  }

  async getVacancies(
    city,
    page,
    schedule = '',
    employment = '',
    experience = '',
    salary = '',
    currency = ''
  ) {
    const options = {
      text: 'frontend',
      page: page || '0',
      per_page: '50',
    };

    if (salary) {
      options.salary = salary
      console.log(salary);
    }

    if (city) {
      options.area = city
    }

    if (schedule) {
      options.schedule = schedule
    }

    if (employment) {
      options.employment = employment
    }

    if (experience) {
      options.experience = experience
    }

    if (currency && salary) {
      options.currency = currency
    }

    return await this.get(`vacancies`, options);
  }

  async getVacancyItem(id) {
    return await this.get(`vacancies/${id}`);
  }

  async getCityId(name = 'Москва') {
    return await this.get(`suggests/areas?text=${name}`);
  }

  async getCompanies() {
    return await this.get(`employers`)
  }

  async getCompanyItem(id) {
    return await this.get(`employers/${id}`)
  }

  async getVacanciesCompany(id) {
    return await this.get(`vacancies?employer_id=${id}&per_page=50`)
  }
}
