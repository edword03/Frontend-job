import { gql } from '@apollo/client';

export const IS_DETAIL_ID = gql`
  query IsDetailsInfo {
    isVisible @client
  }
`;

export const JOB_ITEMS = gql`
  query Job($city: String, $page: String, $schedule: String, $employment: String, $experience: String, $salary: String, $currency: String) {
    vacancies(city: $city, page: $page, schedule: $schedule, employment: $employment, experience: $experience, salary: $salary, currency: $currency) {
      items {
        name
        employer {
          logo_urls {
            _240
            _90
            original
          }
          name
        }
        address {
          city
        }
        id
        experience {
          name
        }
      }
      pages
    }
  }
`;

export const DETAILS_INFO = gql`
  query Item($id: ID) {
    vacancyItem(id: $id) {
      id
      name
      description
      branded_description
      salary {
        currency
        from
        to
        gross
      }
      employer {
        name
        logo_urls {
          original
          _90
          _240
        }
      }
      experience {
        name
      }
      address {
        city
      }
    }
  }
`;
