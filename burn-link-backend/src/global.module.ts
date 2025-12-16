import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";

import { AppExceptionFilter } from "./error/exception.filter";

const MODULES: DynamicModule[] = [];

const SERVICES: Provider[] = [];

@Global()
@Module({
  imports: [...MODULES],
  providers: [{ provide: APP_FILTER, useClass: AppExceptionFilter }, ...SERVICES],
  exports: [...MODULES, ...SERVICES],
})
export class GlobalModule {
  static forRoot(): DynamicModule {
    return {
      module: GlobalModule,
      imports: [],
    };
  }
}
