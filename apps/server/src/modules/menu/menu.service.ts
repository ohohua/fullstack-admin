import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { menu } from '@ohohua/schema'
import { plainToInstance } from 'class-transformer'
import { eq } from 'drizzle-orm'
import { DB, DbType } from '../global/providers/db.provider'
import { accessRoutes } from './model/constant'
import { AddOrUpdateMenuDto, QueryMenuPageDto } from './model/menu.dto'
import { MenuListVo } from './model/menu.vo'

@Injectable()
export class MenuService {
  @Inject(DB)
  private db: DbType

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

  private handleLink(link: any) {
    if (link === undefined || link === '' || link === null) {
      return null; // 空值统一转为 null
    }
    // 若 URL 有非法字符（如空格），可额外编码（# 无需编码）
    return encodeURI(link).replace(/%23/g, '#'); // 确保 # 不被编码为 %23
  };

  /**
   * 递归插入初始化菜单
   * @param menus 
   */
  private async recursiveInsertion(accessRoutes: any[], parentId: string | null) {
    for (const item of accessRoutes) {
      const newMenu: any = {
        ...item,
        component: item.component ?? null,
        parentId,
        type: item.component ? 1 : 0,
      }
      // if (newMenu.meta.link) {
      //   newMenu.meta.link = this.handleLink(newMenu.meta.link)
      // }
      const [row] = await this.db.insert(menu).values(newMenu).$returningId()

      if (item.children && item.children.length > 0) {
        this.recursiveInsertion(item.children, row.id)
      }

    }

  }

  async init() {
    return this.recursiveInsertion(accessRoutes, null);
  }

  async info(id: string) {
    return await this.db.query.role.findFirst({
      where: eq(menu.id, id),
    })
  }

  async list(dto: QueryMenuPageDto) {
    // const likeCondition = this.paginationService.likeCondition(menu.title, dto.title)
    const pageList = await this.db.select().from(menu)

    // 生成一个空的 MetaDto 实例，再转为普通对象（获取所有属性名）
    // const emptyMetaDto = plainToInstance(MenuMetaVo, {})
    // const metaKeys = Object.keys(instanceToPlain(emptyMetaDto)) as (keyof MenuMetaVo)[]

    // const list = pageList.map((it) => {
    //   const meta = JSON.parse(it.meta as string)
    //   return { ...it, meta }
    // })

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

    await this.db.insert(menu).values(result)
    return '新增成功'
  }
}
