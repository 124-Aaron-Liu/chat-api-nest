import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CatchEverythingFilter } from './exceptions/catch-everything-filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 啟用全域的 ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  const httpAdapterHost = app.get(HttpAdapterHost);
  // hint: useGlobalFilters 無法捕捉到WebSocket或Hybrid(Websocket + HTTP)的Websocket例外
  // hint: 當你使用 app.useGlobalFilters()，NestJS 無法在這個時候自動注入依賴，所以需要透過 app.get() 取得 HttpAdapterHost
  // 解法: 可以透過app.module.ts的providers註冊全域例外過濾器，NestJS 會自動注入依賴
  // app.useGlobalFilters(new CatchEverythingFilter(httpAdapterHost));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
