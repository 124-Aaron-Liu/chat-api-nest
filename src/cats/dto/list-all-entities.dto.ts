import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class ListAllEntitiesDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  // 必填(測試用)
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number;
}
