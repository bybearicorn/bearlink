import { Logger } from "@nestjs/common";
import { AbstractLogger } from "typeorm";

export class TypeOrmLogger extends AbstractLogger {
  private logger = new Logger(TypeOrmLogger.name);

  protected writeLog(...args: Parameters<AbstractLogger["writeLog"]>) {
    const [level, logMessage] = args;
    const messages = this.prepareLogMessages(logMessage, { highlightSql: false });

    for (const message of messages) {
      switch (message.type ?? level) {
        case "log":
        case "schema-build":
        case "migration":
          this.logger.log(message.message);
          break;
        case "info":
        case "query":
          this.logger.log([message.prefix, message.message].filter(Boolean).join(" - "));
          break;
        case "warn":
        case "query-slow":
          this.logger.warn([message.prefix, message.message].filter(Boolean).join(" - "));
          break;
        case "error":
        case "query-error":
          this.logger.error([message.prefix, message.message].filter(Boolean).join(" - "));
          break;
      }
    }
  }
}
