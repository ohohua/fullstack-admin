import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class PermissionInsertDto {
  @ApiProperty({ description: '权限名称', required: true })
  @IsNotEmpty({ message: '权限名称不能为空' })
  name: string

  @ApiProperty({ description: '权限编码', required: false })
  @IsNotEmpty({ message: '权限编码不能为空' })
  code: string

  @ApiProperty({ description: '权限描述', required: false })
  @IsOptional()
  description: string
}
