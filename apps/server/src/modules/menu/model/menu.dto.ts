import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator'

export class QueryMenuPageDto {
  @ApiProperty({ description: '菜单标题', required: false })
  @IsOptional()
  title: string
}

export class MetaDto {
  @ApiProperty({ description: '菜单标题', required: true })
  @IsNotEmpty({ message: '菜单标题不能为空' })
  title: string

  @ApiProperty({ description: '菜单国际化标题key', required: false })
  @IsOptional()
  titleI18nKey: string

  @ApiProperty({ description: '菜单图标', required: false })
  @IsOptional()
  icon: string

  @ApiProperty({ description: '外链模式', required: false })
  @IsOptional()
  linkMode: string

  @ApiProperty({ description: '外链地址', required: false })
  @IsOptional()
  link: string

  @ApiProperty({ description: '菜单排序', required: false })
  @IsOptional()
  order: number

  @ApiProperty({ description: '隐藏菜单', required: false })
  @IsOptional()
  hideInMenu: boolean

  @ApiProperty({ description: '标签栏中隐藏', required: false })
  @IsOptional()
  hideInTabs: boolean

  @ApiProperty({ description: '面包屑中隐藏', required: false })
  @IsOptional()
  hideInBreadcrumb: boolean

  @ApiProperty({ description: '缓存组件', required: false })
  @IsOptional()
  keepAlive: boolean

  @ApiProperty({ description: '页面包含布局', required: false })
  @IsOptional()
  layout: boolean
}

export class AddOrUpdateMenuDto {
  @ApiProperty({ description: '菜单id, 编辑必填', required: false })
  @IsOptional()
  id: string

  @ApiProperty({ description: '父级菜单id', required: false })
  @IsOptional()
  parentId: string

  @ApiProperty({ description: '菜单类型', required: true })
  @IsNotEmpty({ message: '菜单类型不能为空' })
  @Type(() => Number)
  type: number

  @ApiProperty({ description: '路由地址', required: true })
  @IsNotEmpty({ message: '路由地址不能为空' })
  path: string

  @ApiProperty({ description: '组件地址', required: false })
  @IsOptional()
  component: string

  @ValidateNested({ message: 'meta 格式错误' })
  @ApiProperty({ description: '菜单元信息', type: MetaDto })
  @Type(() => MetaDto)
  meta: MetaDto
}
