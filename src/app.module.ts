import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { Request, Response } from "express";
import { buildSubgraphSchema } from "@apollo/federation";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";

import { TestModule } from "./test";
import { resolvers, typeDefs } from "./apollo";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloFederationDriver,
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get<string>("NODE_ENV", "development");
        return {
          schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
          debug: nodeEnv !== "production",
          playground: nodeEnv !== "production",
          context: ({ req, res }: { req: Request; res: Response }): any => ({ req, res }),
          autoSchemaFile: "./schema.gql",
        };
      },
    }),
    TestModule,
  ],
})
export class AppModule {}
