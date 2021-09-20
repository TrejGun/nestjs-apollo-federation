import { Application } from "express";
import { ApolloServer, gql } from "apollo-server-express";

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

export async function startApolloServer(app: Application) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  return apolloServer;
}
