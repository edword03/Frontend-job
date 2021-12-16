import { gql } from '@apollo/client';

export const IS_DETAIL_ID = gql`
  query IsDetailsInfo {
    isVisible @client
  }
`;

export const JOB_ITEMS = gql`
  query Job($city: String, $page: String) {
    vacancies(city: $city, page: $page) {
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
      address {
        city
      }
    }
  }
`;
