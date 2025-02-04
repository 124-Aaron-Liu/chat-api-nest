import {
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';


@Catch(HttpException)
export class HttpBaseExceptionFilter extends BaseExceptionFilter {
  // 使用 BaseExceptionFilter 作為基底類別
  // 會直接回傳
  //{
  //   "statusCode": 403,
  //   "message": "Forbidden"
  // }
  catch(exception: HttpException, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
