import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { menu } from '@ohohua/schema'
import { plainToInstance } from 'class-transformer'
import { eq } from 'drizzle-orm'
import { DB, DbType } from '../global/providers/db.provider'
import { PermissionService } from '../permission/permission.service'
import { accessRoutes } from './model/constant'
import { AddOrUpdateMenuDto, MetaDto, QueryMenuPageDto } from './model/menu.dto'
import { MenuListVo } from './model/menu.vo'

@Injectable()
export class MenuService {
  @Inject(DB)
  private db: DbType

  @Inject(PermissionService)
  private permissionService: PermissionService

  /**
   * 构建菜单树
   * @param menus
   * @param parentId
   */
  private buildTree(menus: MenuListVo[], parentId: string | null) {
    // 找到当前 parentId 的子菜单
    const children = menus.filter(menu => menu.parentId === parentId)

    return children.map(child => ({
      ...child,
      children: this.buildTree(menus, child.id),
    }))
  }

  /**
   * 递归插入初始化菜单
   */
  private async recursiveInsertion(accessRoutes: any[], parentId: string | null) {
    for (const item of accessRoutes) {
      const newMenu: any = {
        ...item,
        component: item.component ?? null,
        parentId,
        type: item.component ? 1 : 0,
      }
      const [row] = await this.db.insert(menu).values(newMenu).$returningId()

      // 同时新增对应的访问权限
      await this.permissionService.insert({
        name: item.meta.title,
        code: `${row.id}`,
        description: `访问权限-${item.meta.title}`,
      })

      if (item.children && item.children.length > 0) {
        this.recursiveInsertion(item.children, row.id)
      }
    }
  }

  async init() {
    return this.recursiveInsertion(accessRoutes, null)
  }

  async info(id: string) {
    return await this.db.query.role.findFirst({
      where: eq(menu.id, id),
    })
  }

  async list(_dto: QueryMenuPageDto) {
    // const likeCondition = this.paginationService.likeCondition(menu.title, dto.title)
    const pageList = await this.db.select().from(menu)

    return this.buildTree(plainToInstance(MenuListVo, pageList), null)
  }

  async del(id: string) {
    try {
      await this.db.delete(menu).where(eq(menu.id, id))
      return '删除成功'
    }
    catch (error) {
      throw new BadRequestException(error)
    }
  }

  async addOrUpdate(dto: AddOrUpdateMenuDto) {
    const { id, ...rest } = plainToInstance(AddOrUpdateMenuDto, dto)

    const result = { ...rest, ...rest.meta }
    if (id) {
      const queryMenu = await this.db.select().from(menu).where(eq(menu.id, id))
      if (!queryMenu) {
        throw new BadRequestException('菜单id无效')
      }
      await this.db.update(menu).set(result).where(eq(menu.id, id))
      return '修改成功'
    }

    const [row] = await this.db.insert(menu).values(result).$returningId()

    // 同时新增对应的访问权限
    const meta: MetaDto = JSON.parse(rest.meta as any)

    await this.permissionService.insert({
      name: meta.title,
      code: `${row.id}`,
      description: `访问权限-${meta.title}`,
    })

    return '新增成功'
  }
}
