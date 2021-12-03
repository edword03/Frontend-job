import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Subscription  {
    update: JobsRes
  }

  type JobsRes {
    id: ID
    alternate_url: String
    found: Int
    items: [VacanciesItem]
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

  type Query {
    getVacancies: JobsRes
  }
`;
