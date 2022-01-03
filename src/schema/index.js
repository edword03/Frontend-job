import { gql } from "apollo-server-express";

const typeDefs = gql`
  type JobsRes {
    id: ID
    alternate_url: String
    found: Int
    items: [VacanciesItem]
    pages: String
  }

  type VacanciesItem {
    alternate_url: String
    archived: Boolean
    area: Area
    address: Address
    apply_alternate_url: String
    created_at: String
    employer: Employer
    has_test: Boolean
    id: ID
    name: String
    published_at: String
    salary: Salary
    schedule: Schedule
    snippet: Snippet
    experience: Experience
  }

  type KeySkills {
    name: String
  }

  type BillingType {
    id: String
    name: String
  }

  type VacancyItem {
    id: ID
    premium: Boolean
    billing_type: BillingType
    name: String
    area: Area
    salary: Salary
    address: Address
    experience: Experience
    schedule: Schedule
    employment: Employment
    description: String
    key_skills: [KeySkills]
    employer: Employer
    created_at: String
  }

  type Employment {
    id: String
    name: String
  }

  type Snippet {
    requirement: String
    responsibility: String
  }

  type Schedule {
    id: String
    name: String
  }

  type Salary {
    currency: String
    from: Int
    gross: Boolean
    to: Int
  }

  type Employer {
    alternate_url: String
    id: ID
    logo_urls: LogoUrl
    name: String
    trusted: Boolean
    url: String
    vacancies_url: String
  }

  type LogoUrl {
    _90: String
    _240: String
    original: String
  }

  type Experience {
    id: String
    name: String
  }

  type Address {
    building: String
    city: String
    description: String
    id: ID
    lat: Float
    lng: Float
    metro: String
    raw: String
    street: String
  }

  type Area {
    id: String
    name: String
    url: String
  }

  type ReqBody {
    city: ID
  }

  type CityItems {
    id: ID
    text: String
    url: String
  }

  type CityResponse {
    items: [CityItems]
  }

  type Query {
    vacancies(
      city: String
      page: String
      schedule: String
      employment: String
      experience: String
      salary: String
      currency: String
    ): JobsRes
    vacancyItem(id: ID): VacancyItem
    cityId(city: String): CityResponse
  }
`;

export default typeDefs;
