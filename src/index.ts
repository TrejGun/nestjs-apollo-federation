import { NestFactory } from "@nestjs/core";
import { NestExpressApplication, ExpressAdapter } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";

import { AppModule } from "./app.module";
import { expressServer } from "./express";

async function bootstrap(): Promise<void> {
  const adapter = new ExpressAdapter(expressServer);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, adapter);

  const configService = app.get(ConfigService);

  const nodeEnv = configService.get<string>("NODE_ENV", "development");

  if (nodeEnv === "production" || nodeEnv === "staging") {
    app.enableShutdownHooks();
  }

  const host = configService.get<string>("HOST", "localhost");
  const port = configService.get<number>("PORT", 3000);

  await app.listen(port, host, () => {
    console.info(`API server is running on http://${host}:${port}/graphql`);
  });
}

void bootstrap();
