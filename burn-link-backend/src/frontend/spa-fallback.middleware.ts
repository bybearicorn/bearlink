// spa-fallback.middleware.ts
import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class SpaFallbackMiddleware implements NestMiddleware {
  private readonly logger = new Logger(SpaFallbackMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    if (req.path.includes(".") || req.path.includes("/api/")) {
      // ignore static files (everything with extension) & api
      return next();
    }

    this.logger.debug(`Applying SPA fallback for ${req.path}`);

    const NODE_ENV = process.env.NODE_ENV;

    const title = "Bearicorn";
    const description = "Bearicorn is Europe's first Defense tool!";
    const image = "";

    // AR: not using any special templating engine, just JS template literal, it's just one HTML file
    const html = `
      <!doctype html>
      <html>

      <head>
        <meta charset="UTF-8" />
        <title>Bearicorn</title>
        <meta itemprop="description" content="${description}" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="google" content="notranslate" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!-- Google / Search Engine Tags -->
        <meta itemprop="name" content="${title}" />
        <meta itemprop="image" content="${image}" />
        <!-- Facebook Meta Tags -->
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:image:url" content="${image}" />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1280" />
        <meta property="og:locale" content="sk_SK" />
        <meta property="og:site_name" content="Bearicorn" />
        <!-- Twitter Meta Tags -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
        <meta name="twitter:image" content="${image}" />
        <link rel="stylesheet" href="/dist/main.css" type="text/css" />
      </head>

      <body>
        <div id="app"></div>
        <!-- ENV VARS -->
        <script>
          window.__ENV__ = {
            NODE_ENV: "${NODE_ENV}",
          };
        </script>
        <script src="/dist/main.js"></script>
        ${NODE_ENV === "development" ? "" : "<script src='/dist/runtime.js'></script>"}
        ${NODE_ENV === "development" ? "" : "<script src='/dist/vendors.js'></script>"}
      </body>
      </html>
    `;

    return res.send(html);
  }
}
