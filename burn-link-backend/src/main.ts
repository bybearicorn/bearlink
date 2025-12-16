import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { json } from "express";
import { AppModule } from "./app.module";
import { LoggingInterceptor } from "./interceptor/logging.interceptor";
import { generateOpenApi } from "./util/openapi";
import "./util/pg-conf";

const logger = new Logger("main");

const generateOpenApiAndQuit = process.argv[2] === "--generate-openapi";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    preview: generateOpenApiAndQuit,
    logger: ["log", "warn", "error", "fatal"],
  });

  await generateOpenApi({ app, swaggerTitle: "BURN LINK API", docOnly: generateOpenApiAndQuit });
  if (generateOpenApiAndQuit) {
    return;
  }

  app.use(json({ limit: "10mb" })); // override, messages with inline images are bigger
  app.use(cookieParser());
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(process.env.PORT ?? 6003, "0.0.0.0", async () => {
    logger.log(`burn-link is running on ${await app.getUrl()}`);
  });
}
void bootstrap();
