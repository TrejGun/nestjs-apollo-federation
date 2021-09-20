import { Application } from "express";
import { config } from "dotenv";
import { ApolloServer } from "apollo-server-express";

import { expressServer } from "./express";
import { resolvers, typeDefs } from "./apollo";

config();

export async function startApolloServer(app: Application) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  return apolloServer;
}

void startApolloServer(expressServer).then(apolloServer => {
  const host = process.env.HOST as unknown as string;
  const port = process.env.PORT as unknown as number;

  expressServer.listen(port, host, () => {
    console.info(`server running on port http://${host}:${port}${apolloServer.graphqlPath}`);
  });
});
