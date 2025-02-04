
import { Controller, Get, Query, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntitiesDto } from './dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { Response } from 'express';  // 確保這個導入

// {domain}/cats
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  // @Get()
  // findAll(@Query() query: ListAllEntitiesDto, @Res() res: Response) {
  //   const { page, limit } = query;
  //   // 直接使用 res 返回響應
  //   return res.status(200).json({
  //     message: `Fetching cats, page: ${page}, limit: ${limit}`,
  //   });
  // }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    return res.status(200).json({
      message: `This action returns a #${id} cat`,
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
