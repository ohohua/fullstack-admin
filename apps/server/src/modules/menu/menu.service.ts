import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { menu } from '@ohohua/schema';
import { eq, and, getTableColumns } from 'drizzle-orm';
import { PaginationService } from '../global/pagination/pagination.service';
import { DB, DbType } from '../global/providers/db.provider';
import { QueryRolePageDto, AddOrUpdateRoleDto } from '../role/model/role.vo';

@Injectable()
export class MenuService {
  @Inject(DB)
  private db: DbType

  @Inject(PaginationService)
  private paginationService: PaginationService

  async info(id: string) {
    return await this.db.query.role.findFirst({
      where: eq(menu.id, id)
    })
  }

  async list(dto: QueryRolePageDto) {
    {

      // const conditions = [
      //   this.paginationService.likeCondition(menu.name, dto.name),
      //   this.paginationService.likeCondition(menu.code, dto.code),
      //   this.paginationService.eqCondition(menu.status, dto.status),
      // ].filter(Boolean);

      // const where = conditions.length > 0 ? and(...conditions) : undefined;

      const { ...rest } = getTableColumns(menu)
      // 2. 调用通用分页方法
      return this.paginationService.paginate(
        menu,
        {
          page: dto.page,
          pageSize: dto.pageSize
        },
        undefined,
        {
          columns: { ...rest },
          orderBy: { createTime: 'desc' },
        })
    }
  }

  async del(id: string) {
    try {
      await this.db.delete(menu).where(eq(menu.id, id))
      return '删除成功'
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async addOrUpdate(dto: AddOrUpdateRoleDto) {

  }
}
