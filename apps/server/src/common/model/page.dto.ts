import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, Min } from 'class-validator'

export class QueryPageDto {
  // 页码：必须是整数，且最小值为 1，可选（默认 1）
  @IsOptional()
  @Type(() => Number) // 自动将字符串转换为数字
  @IsInt({ message: 'page 必须是整数' })
  @Min(1, { message: 'page 最小值为 1' })
  @ApiProperty({ description: '页码', required: false, default: 1 })
  page: number = 1

  // 每页条数：必须是整数，最小值为 1，最大值为 100，可选（默认 10）
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit 必须是整数' })
  @Min(1, { message: 'limit 最小值为 1' })
  @ApiProperty({ description: '每条页数', required: false, default: 10 })
  pageSize: number = 10
}
