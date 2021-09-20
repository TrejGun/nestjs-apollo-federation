import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";

const app = express();

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

async function startApolloServer(app: Application) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  return app;
}

export const expressApp = (): Promise<any> => startApolloServer(app);
