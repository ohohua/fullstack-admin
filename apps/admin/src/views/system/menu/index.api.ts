import type { Merge, SetOptional } from 'type-fest'
import type { linkModeMapping, typeMapping } from './utils/constants'
import http from '@/utils/axios'
import { isNil } from 'lodash-es'

type TypeEnum = keyof typeof typeMapping
type LinkModeEnum = keyof typeof linkModeMapping

export interface Menu {
  id: string
  path: string
  type: TypeEnum
  component?: string
  children?: Menu[]
  meta?: {
    title: string
    icon?: string
    layout?: boolean
    hideInMenu?: boolean
    hideInTabs?: boolean
    titleI18nKey?: string
    link?: string | true
    linkMode?: LinkModeEnum
    hideInBreadcrumb?: boolean
  }
}

export class Api {
  /**
   * 查询所有菜单
   */
  static list() {
    return http.get<Menu[]>('/menu/list')
  }

  /**
   * 新增或修改菜单
   */
  static insertOrUpdate(data: Merge<SetOptional<Menu, 'id'>, { parentId: null | string }>) {
    return http({
      method: isNil(data.id) ? 'post' : 'put',
      url: '/menu',
      data,
    })
  }

  /**
   * 删除菜单
   */
  static del(id: string) {
    return http.delete(`/menu/${id}`)
  }
}
