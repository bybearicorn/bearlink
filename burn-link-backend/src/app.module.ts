import { Logger, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { ScheduleModule } from "@nestjs/schedule";
import { BurnLinkModule } from "./app-modules/burn-link/burn-link.module";
import { AppConfig, CONFIG_DEFAULT } from "./config";
import { SpaFallbackMiddleware } from "./frontend/spa-fallback.middleware";
import { StaticFilesModule } from "./frontend/static-files.module";
import { GlobalModule } from "./global.module";
import { BeforeInsertSubscriber } from "./util/before-insert.subscriber";
import { TypeOrmLogger } from "./util/type-orm-logger";

const logger = new Logger("AppModule");

@Module({
  imports: [
    GlobalModule.forRoot(), // not used yet
    StaticFilesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService<AppConfig>): TypeOrmModuleOptions => {
        logger.log("Using postgres DB");
        const ca = cfg.get("DB_CA");
        const ssl = ca ? { ca, rejectUnauthorized: true } : undefined;

        const dbCfg = {
          type: "postgres",
          host: cfg.getOrThrow("DB_HOST"),
          port: cfg.getOrThrow("DB_PORT", { infer: true }),
          username: cfg.getOrThrow("DB_USERNAME"),
          password: cfg.getOrThrow("DB_PASSWORD"),
          database: cfg.getOrThrow("DB_DATABASE"),
          schema: cfg.getOrThrow("DB_SCHEMA", CONFIG_DEFAULT.DB_SCHEMA),
          ssl,
          extra: {
            ssl,
          },
          autoLoadEntities: true,
          logging: "all",
          logger: new TypeOrmLogger(["migration", "error", "schema"]),
          synchronize: false,
          migrations: ["./**/typeorm-migrations/*.js"],
          migrationsTableName: "typeorm_migrations",
          migrationsRun: true,
          subscribers: [BeforeInsertSubscriber],
        } satisfies TypeOrmModuleOptions;

        logger.log(
          `DB config: HOST: ${dbCfg.host}, PORT: ${dbCfg.port}, USER: ${dbCfg.username}, PASS: ${dbCfg.password ? "*****" : "!!!EMPTY!!!"}, DBNAME:${dbCfg.database}, SCHEMA: ${dbCfg.schema}, SSL: ${!!dbCfg.ssl}, CERT: ${ca ? ca.substring(0, 20) + "..." : "N/A"}`,
        );

        return dbCfg;
      },
    }),
    // app modules
    BurnLinkModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SpaFallbackMiddleware).forRoutes({ path: "*", method: RequestMethod.GET });
  }
}
