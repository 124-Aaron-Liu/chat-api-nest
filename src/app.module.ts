import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { LoggerGetMiddleware } from './middlewares/logger.get.middleware';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerPostMiddleware } from './middlewares/logger.post.middleware';
import { LoggerAllMiddleware } from './middlewares/logger.all.middleware';
import { logger } from './middlewares/logger.functional.middleware';
import { CatchEverythingFilter } from './exceptions/catch-everything-filter';

@Module({
  // 引用feature module
  imports: [CatsModule],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter, // 註冊全域例外過濾器，NestJS 會自動注入依賴
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // multiple middleware, functional middleware
      .apply(LoggerGetMiddleware, LoggerAllMiddleware, logger)
      .forRoutes({ path: 'cats', method: RequestMethod.GET })
      .apply(LoggerPostMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.POST });
  }
}
