import { ArgumentsHost, Catch, Logger } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class AppExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(AppExceptionFilter.name);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- any also in parent (3rd party)
  override catch(err: any, host: ArgumentsHost): void {
    // const ctx = host.switchToHttp();
    // const response = ctx.getResponse<Response>();

    this.logger.warn(`Error caught: ${err.message || err.name}`);
    this.logger.verbose(err.stack);

    super.catch(err, host);
  }
}
