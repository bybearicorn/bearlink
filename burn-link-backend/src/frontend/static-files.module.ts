import { Logger, Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      useFactory: () => {
        const logger = new Logger("ServeStaticModule");
        const fePath =
          process.env.NODE_ENV === "development"
            ? [__dirname, "../../../../../burn-link-frontend"]
            : ["/burn-link/burn-link-frontend"];

        logger.log(`Frontend path: ${join(...fePath)}`);

        return [
          {
            // Serve static files from the 'dist' folder
            rootPath: join(...fePath, "dist"),
            serveRoot: "/dist",
          },
          {
            // Serve static files from the 'dist/assets' folder
            rootPath: join(...fePath, "dist/assets"),
            serveRoot: "/assets",
          },
          {
            // Serve static files from the "public" directory
            rootPath: join(...fePath, "public"),
            serveRoot: "/public",
          },
          {
            // Serve the favicon
            rootPath: join(...fePath, "public/favicon.ico"),
            serveRoot: "/favicon.ico",
            serveStaticOptions: { fallthrough: true },
          },
          {
            // Serve the sw.js
            rootPath: join(...fePath, "public/stream-saver/sw.js"),
            serveRoot: "/sw.js",
            serveStaticOptions: { fallthrough: true },
          },
          {
            // Serve the mitm.html
            rootPath: join(...fePath, "public/stream-saver/mitm.html"),
            serveRoot: "/mitm.html",
            serveStaticOptions: { fallthrough: true },
          },
        ];
      },
    }),
  ],
})
export class StaticFilesModule {}
