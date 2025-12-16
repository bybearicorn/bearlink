import { CallHandler, ExecutionContext, HttpException, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- any also in parent (3rd party)
export class LoggingInterceptor<T = any, R = any> implements NestInterceptor<T, R> {
  private readonly logger = new Logger(LoggingInterceptor.name);

  private counter = 0;

  intercept(context: ExecutionContext, next: CallHandler): Observable<R> {
    const req = context.switchToHttp().getRequest<Request>();
    const { method, url } = req;
    const now = Date.now();

    const id = ++this.counter;
    this.logger.log(`REQ #${id} ${method} ${url}`);

    return next.handle().pipe(
      tap(() => this.logRes(context, id, now)),
      catchError((err) => {
        this.logRes(context, id, now, err);
        return throwError(() => err);
      }),
    );
  }

  private logRes(context: ExecutionContext, id: number, start: number, err?: Error) {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const { method, url } = req;

    const statusCode = err ? (err instanceof HttpException ? err.getStatus() : 500) : res.statusCode;
    this.logger.log(`RES #${id} ${method} ${url} ${statusCode} +${Date.now() - start}ms`);
  }
}
