import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  UseFilters,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntitiesDto } from './dto';
import { CatsService } from './cats.service';
import { Response } from 'express';
import { HttpExceptionFilter } from '../exceptions/http-exception.filter';
import { HttpBaseExceptionFilter } from '../exceptions/http-base-exception.filter';
import { ForbiddenException } from '../exceptions/forbidden.exception'; // 確保這個導入

// {domain}/cats
@Controller('cats')
@UseFilters(HttpBaseExceptionFilter)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  findAll(@Query() query: ListAllEntitiesDto, @Res() res: Response) {
    const { page, limit } = query;
    const cats = this.catsService.findAll();
    // 直接使用 res 返回響應
    return res.status(200).json({
      message: `Fetching cats, page: ${page}, limit: ${limit}`,
      cats,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    if (id === 'a') {
      throw new ForbiddenException();
    }
    if (id === 'b') {
      throw new HttpException('Forbidden2', HttpStatus.FORBIDDEN);
    }
    if (id === 'c') {
      throw new Error('Unexpected Error');
    }
    return res.status(200).json({
      message: `This action returns a #${id} cat`,
    });
  }

  @Put(':id')
  update(
    // @Param('id', ParseIntPipe) id: number,
    // we can instead pass an in-place instance.
    // Passing an in-place instance is useful if we want to customize the built-in pipe's behavior by passing options
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateCatDto: UpdateCatDto,
    @Res() res: Response,
  ) {
    return res.status(200).json({
      message: `This action updates a #${id} `,
      updateCatDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
