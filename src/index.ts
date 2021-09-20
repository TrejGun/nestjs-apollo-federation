import express from "express";
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

async function startApolloServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  return app;
}

void startApolloServer().then(app => {
  app.get("/rest", function (req, res) {
    res.json({ data: "api working" });
  });

  const host = "localhost";
  const port = 3000;

  app.listen(port, host, function () {
    console.info(`server running on port http://${host}:${port}/graphql`);
  });
});
