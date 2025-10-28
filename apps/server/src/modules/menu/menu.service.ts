import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { menu } from '@ohohua/schema'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { eq } from 'drizzle-orm'
import { omit, pick } from 'lodash'
import { PaginationService } from '../global/pagination/pagination.service'
import { DB, DbType } from '../global/providers/db.provider'
import { AddOrUpdateMenuDto, QueryMenuPageDto } from './model/menu.dto'
import { MenuListVo, MenuMetaVo } from './model/menu.vo'

@Injectable()
export class MenuService {
  @Inject(DB)
  private db: DbType

  @Inject(PaginationService)
  private paginationService: PaginationService

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

  async info(id: string) {
    return await this.db.query.role.findFirst({
      where: eq(menu.id, id),
    })
  }

  async list(dto: QueryMenuPageDto) {
    const likeCondition = this.paginationService.likeCondition(menu.title, dto.title)
    const pageList = await this.db.select().from(menu).where(likeCondition)

    // 生成一个空的 MetaDto 实例，再转为普通对象（获取所有属性名）
    const emptyMetaDto = plainToInstance(MenuMetaVo, {})
    const metaKeys = Object.keys(instanceToPlain(emptyMetaDto)) as (keyof MenuMetaVo)[]

    const list = pageList.map((it) => {
      const meta = pick(it, metaKeys)
      return {
        ...omit(it, metaKeys),
        meta,
      }
    })

    return this.buildTree(plainToInstance(MenuListVo, list), null)
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
    const { id, ...rest } = dto

    const result = { ...rest, ...rest.meta }
    if (id) {
      const queryMenu = await this.db.query.menu.findFirst({
        where: eq(menu.id, id),
      })
      if (!queryMenu) {
        throw new BadRequestException('菜单id无效')
      }
      await this.db.update(menu).set(result).where(eq(menu.id, id))
      return '修改成功'
    }

    await this.db.insert(menu).values(result)
    return '新增成功'
  }
}
