import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GqlModuleOptions, GraphQLModule } from "@nestjs/graphql";
import { Request, Response } from "express";
import { buildSubgraphSchema } from "@apollo/federation";

import { TestModule } from "./test";
import { resolvers, typeDefs } from "./apollo";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): GqlModuleOptions => {
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
