import { gql, useQuery } from '@apollo/client';

export const GET_FEATURED = gql`
  query {
    featuredBeans {
      id
      roaster
      name
      roast
    }
  }
`;
