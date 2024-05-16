import { gql } from "@apollo/client";

export const GET_LOCATIONS = gql`
  query ($page: Int) {
    locations(page: $page) {
      info {
        pages
      }
      results {
        name
        id
        dimension
        type
      }
    }
  }
`;
