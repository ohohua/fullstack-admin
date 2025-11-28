import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { QueryPageDto } from 'src/common/model/page.dto'

export class QueryRolePageDto extends QueryPageDto {
  @ApiProperty({ description: '角色名', required: false })
  @IsOptional()
  name: string

  @ApiProperty({ description: '角色编码', required: false })
  @IsOptional()
  code: string

  @ApiProperty({ description: '角色状态', required: false })
  @IsOptional()
  status: number
}

export class AddOrUpdateRoleDto {
  @ApiProperty({ description: '角色id, 编辑必填', required: false })
  @IsOptional()
  id: string

  @ApiProperty({ description: '角色名', required: true })
  @IsNotEmpty({ message: '角色名不能为空' })
  name: string

  @ApiProperty({ description: '角色编码', required: true })
  @IsNotEmpty({ message: '角色编码不能为空' })
  code: string

  @ApiProperty({ description: '权限id列表', required: true })
  @IsNotEmpty({ message: '权限列表不能为空' })
  permission: string[]

  @ApiProperty({ description: '状态', required: true })
  @IsNotEmpty({ message: '角色状态不能为空' })
  status: string

  @ApiProperty({ description: '备注', required: false })
  remark: string
}
