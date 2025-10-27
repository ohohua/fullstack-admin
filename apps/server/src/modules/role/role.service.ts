import { DbType } from './../global/providers/db.provider';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DB } from '../global/providers/db.provider';
import { AddOrUpdateRoleDto, QueryRolePageDto } from './model/role.vo';
import { PaginationService } from '../global/pagination/pagination.service';
import { role } from '@ohohua/schema';
import { and, eq, getTableColumns } from 'drizzle-orm';

@Injectable()
export class RoleService {
  @Inject(DB)
  private db: DbType

  @Inject(PaginationService)
  private paginationService: PaginationService

  async info(id: string) {
    return await this.db.query.role.findFirst({
      where: eq(role.id, id)
    })
  }

  async list(dto: QueryRolePageDto) {
    {

      const conditions = [
        this.paginationService.likeCondition(role.name, dto.name),
        this.paginationService.likeCondition(role.code, dto.code),
        this.paginationService.eqCondition(role.status, dto.status),
      ].filter(Boolean);

      const where = conditions.length > 0 ? and(...conditions) : undefined;

      const { ...rest } = getTableColumns(role)
      // 2. 调用通用分页方法
      return this.paginationService.paginate(
        role,
        {
          page: dto.page,
          pageSize: dto.pageSize
        },
        where,
        {
          columns: { ...rest },
          orderBy: { createTime: 'desc' },
        })
    }
  }

  async del(id: string) {
    try {
      await this.db.delete(role).where(eq(role.id, id))
      return '删除成功'
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async addOrUpdate(dto: AddOrUpdateRoleDto) {
        
  }
}
