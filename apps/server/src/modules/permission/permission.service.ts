import { BadGatewayException, Inject, Injectable } from '@nestjs/common'
import { permission } from '@ohohua/schema'
import { eq } from 'drizzle-orm'
import { DB, DbType } from '../global/providers/db.provider'
import { PermissionInsertDto } from './model/permission.dto'

@Injectable()
export class PermissionService {
  @Inject(DB)
  private db: DbType

  /**
   * 插入权限数据
   */
  async insert(dto: PermissionInsertDto) {
    if (!dto) {
      throw new BadGatewayException('参数不能为空')
    }

    if (!dto.name) {
      throw new BadGatewayException('权限名称不能为空')
    }

    if (!dto.code) {
      throw new BadGatewayException('权限编码不能为空')
    }

    await this.db.insert(permission).values(dto)
  }

  // 删除权限数据
  async del(ids: string[]) {
    if (!ids || ids.length === 0) {
      throw new BadGatewayException('权限id数组不能为空')
    }

    await this.db.transaction(async (tx) => {
      for (const id of ids) {
        await tx.delete(permission).where(eq(permission.id, id))
      }
    })

    return '删除成功'
  }
}
