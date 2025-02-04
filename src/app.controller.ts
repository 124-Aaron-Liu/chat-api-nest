import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';

@Controller()
export class AppController {
  // 因為cats.module.ts有設定exports: [CatsService]，所以可以直接注入
  constructor(private readonly appService: AppService, private readonly catsService: CatsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cats2')
  getCats() {
    return this.catsService.findAll();  // 使用 CatsService 的方法
  }
}
