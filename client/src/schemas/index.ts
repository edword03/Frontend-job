import {gql} from "@apollo/client"

export const IS_DETAIL_ID = gql`
  query IsDetailsInfo {
    isVisible @client
  }
`;

export const JOB_ITEMS = gql`
  query Job($city: String) {
    vacancies(city: $city) {
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
    }
  }
`;