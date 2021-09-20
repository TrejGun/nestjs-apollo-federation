import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    totalPosts: Int!
  }
`;

export const resolvers = {
  Query: {
    totalPosts: () => 100,
  },
};
