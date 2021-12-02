import gql from 'graphql-tag';

export const СHARACTERS_BY_ID = gql`
  query charactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      status
      species
      gender
      image
      episode {
        episode
        name
      }
    }
  }
`;

export const CHARACTERS = gql` 
  query characters($page: Int!, $name: String!, $gender: String!, $species: String!) {
    characters(page: $page, filter: { name: $name, gender: $gender, species: $species }) {
      info {
        pages
      }
      results {
        id
        name
        status
        species
        gender
        image
        episode {
          episode
        }
      }
    }
  }
`;