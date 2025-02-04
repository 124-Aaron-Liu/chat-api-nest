import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  private readonly logger = new Logger(ForbiddenException.name); // 建立日誌記錄器

  constructor(message: string = 'Forbidden') {
    super('Forbidden', HttpStatus.FORBIDDEN);
    this.logger.warn(`Access Denied: ${message}`);
  }
}
