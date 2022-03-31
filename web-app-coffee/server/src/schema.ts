import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    coffeBeans: [CoffeBeans!]!
  }

  type CoffeBeans {
    id: ID!
    name: String!
    origin: String!
    description: String!
    tastingNotes: [String!]!
    picture: String!
    price: Int!
    grindSize: GrindSizeRec!
    reviews: [Review!]!
  }

  type GrindSizeRec {
    id: ID!
    grinderName: String!
    espresso: Int!
    pourOver: Int!
    frenchPress: Int!
  }

  type Review {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    reviews: [Review!]!
  }
`;
