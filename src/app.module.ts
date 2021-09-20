import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GqlModuleOptions, GraphQLModule } from "@nestjs/graphql";
import { Request, Response } from "express";

import { TestModule } from "./test/test.module";

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
