import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    coffeeBeans: [CoffeeBeans!]!
    reviews: [Review!]!
    hello: String
  }

  type Mutation {

    # Coffee Beans Mutations
    coffeeCreate(coffee: )

    # Review Mutations
    reviewCreate(review: ReviewInput!): ReviewPayload!
    reviewUpdate(reviewId: ID!, review: ReviewInput!): ReviewPayload!
    reviewDelete(reviewId: ID!): ReviewPayload!

    # User Mutations
    signup(email: String!, password: String!, name: String!, bio: String!): AuthPayload!
    signin(credentials: CredentialsInput): AuthPayload!
  }

  type CoffeeBeans {
    id: ID!
    name: String!
    origin: String!
    description: String!
    roast: String!
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
    coffeeBeans: CoffeeBeans
    user: User!
  }

  type ReviewPayload {
    userErrors: [UserError!]!
    review: Review
  }

  input ReviewInput {
    title: String
    content: String
    coffeeBeans: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    reviews: [Review]!
  }

  type UserError {
    message: String!
  }

  type AuthPayload {
    userErrors: [UserError!]!
    token: String
  }

  input CredentialsInput {
    email: String!
    password: String!
  }
`;
