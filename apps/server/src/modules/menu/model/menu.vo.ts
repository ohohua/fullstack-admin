import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Expose, Type } from 'class-transformer'

export class MenuInfoVo {

}

export class MenuMetaVo {
  @ApiProperty({ description: '菜单标题' })
  @Expose()
  title: string

  @ApiProperty({ description: '菜单国际化标题key' })
  @Expose()
  titleI18nKey: string

  @ApiProperty({ description: '菜单图标' })
  @Expose()
  icon: string

  @ApiProperty({ description: '外链模式' })
  @Expose()
  linkMode: string

  @ApiProperty({ description: '外链地址' })
  @Expose()
  link: string

  @ApiProperty({ description: '菜单排序' })
  @Expose()
  order: number

  @ApiProperty({ description: '隐藏菜单' })
  @Expose()
  hideInMenu: boolean

  @ApiProperty({ description: '标签栏中隐藏' })
  @Expose()
  hideInTabs: boolean

  @ApiProperty({ description: '面包屑中隐藏' })
  @Expose()
  hideInBreadcrumb: boolean

  @ApiProperty({ description: '缓存组件' })
  @Expose()
  keepAlive: boolean

  @ApiProperty({ description: '页面包含布局' })
  @Expose()
  layout: boolean
}

export class MenuListVo {
  @ApiProperty({ description: '菜单id' })
  @Expose()
  id: string

  @ApiProperty({ description: '父级菜单id' })
  @Expose()
  parentId: string

  @ApiProperty({ description: '菜单类型' })
  @Type(() => Number)
  @Expose()
  type: number

  @ApiProperty({ description: '路由地址' })
  @Expose()
  path: string

  @ApiProperty({ description: '组件地址' })
  @Expose()
  component: string

  @ApiProperty({ description: '菜单元信息', type: MenuMetaVo })
  @Expose()
  @Type(() => MenuMetaVo)
  meta: MenuMetaVo

  @Expose()
  @ApiPropertyOptional({ description: '子菜单列表', type: () => [MenuListVo] })
  @Type(() => MenuListVo)
  children: MenuListVo[] = []
}
