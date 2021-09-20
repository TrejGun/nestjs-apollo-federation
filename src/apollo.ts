import { Application } from "express";
import { ApolloServer } from "apollo-server-express";

const typeDefs = `
    type Query{
        totalPosts: Int!
    }
`;

const resolvers = {
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
