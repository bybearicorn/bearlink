import { INestApplication, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFile } from "fs/promises";
import yaml from "js-yaml";

type GenerateOpenApiParams = {
  app: INestApplication<unknown>;
  swaggerTitle: string;
  docOnly: boolean;
};

const logger = new Logger("openapi");

export async function generateOpenApi({ app, swaggerTitle, docOnly }: GenerateOpenApiParams) {
  const config = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setVersion("1.0")
    .addCookieAuth("jwt", { description: `JWT cookie`, type: "apiKey", in: "cookie" })
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    // include: [publicControllersModule],
    deepScanRoutes: true,
    autoTagControllers: false,
  });

  if (docOnly) {
    logger.log("Generating openapi.yam;");
    await writeFile("openapi.yaml", yaml.dump(document, { noRefs: true }));
  } else if (process.env.NODE_ENV === "development") {
    logger.log("Setting upswagger");
    // const moduleOptions: SwaggerCustomOptions = { swaggerOptions: { persistAuthorization: true } };
    SwaggerModule.setup("swagger", app, document);
  } else {
    logger.debug("No swagger setup");
  }
}
