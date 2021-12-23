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
      // [salary && salary]: salary,
      // [experience && experience]: experience
      // schedule: schedule,
      // employment: employment,
      // experience: experience,
      // salary: salary,
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

    console.log(options);
    return await this.get(`vacancies`, options);
  }

  async getVacancyItem(id) {
    return await this.get(`vacancies/${id}`);
  }

  async getCityId(name = 'Москва') {
    return await this.get(`suggests/areas?text=${name}`);
  }
}
