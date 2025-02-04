import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController} from './cats/cats.controller';
import {CatsService} from './cats/cats.service';

import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

@Module({
  // 引用feature module
  imports: [CatsModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
