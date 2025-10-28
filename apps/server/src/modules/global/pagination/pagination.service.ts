// src/common/services/pagination.service.ts
import { Inject, Injectable } from '@nestjs/common'
import { and, sql, SQL } from 'drizzle-orm'
import { MySqlTableWithColumns } from 'drizzle-orm/mysql-core'
import { PaginationParams, PaginationResult } from 'src/types'
import { DB, DbType } from '../providers/db.provider'

/**
 * 分页查询选项（扩展配置）
 */
export interface PaginationOptions<T> {
  columns?: (keyof T)[] | Record<string, any>
  orderBy?: Partial<Record<keyof T, 'asc' | 'desc'>>
  extraSql?: SQL // 可用于原始 SQL 片段（慎用）
  exclude?: (keyof T)[]
  tableAlias?: string
}

@Injectable()
export class PaginationService {
  @Inject(DB)
  private db: DbType

  /**
   * 通用分页查询方法
   * - table: Drizzle 表实例
   * - params: { page, pageSize }
   * - where: 单个条件或条件数组（会自动过滤 undefined）
   * - options: columns/orderBy/exclude/extraSql
   */
  async paginate<T extends Record<string, any>>(
    table: MySqlTableWithColumns<any>,
    params: PaginationParams,
    where?: any | any[],
    options: PaginationOptions<T> = {},
  ): Promise<PaginationResult<T>> {
    const { page = 1, pageSize = 10 } = params
    const offset = (page - 1) * pageSize
    const { columns, orderBy, extraSql, exclude } = options

    // 规范化 where 条件为数组并去除 undefined/null
    const whereClauses: any[] = []
    if (Array.isArray(where)) {
      whereClauses.push(...where.filter(Boolean))
    }
    else if (where) {
      whereClauses.push(where)
    }

    // 处理 select 字段：支持数组或自定义映射；不传则查询全部列（后续可用 exclude 在返回时删除敏感字段）
    let selectColumns: any = table
    if (columns) {
      if (Array.isArray(columns)) {
        selectColumns = columns.reduce((acc, key) => {
          acc[String(key)] = table[key as any]
          return acc
        }, {} as any)
      }
      else {
        selectColumns = columns
      }
    }

    // 数据查询
    let dataQuery: any = this.db
      .select(selectColumns)
      .from(table)

    // 应用 where
    if (whereClauses.length) {
      // Drizzle 的 where 可以接受多参，使用展开
      dataQuery = dataQuery.where(and(...whereClauses))
    }

    // 处理排序
    if (orderBy) {
      Object.entries(orderBy).forEach(([key, dir]) => {
        dataQuery = dataQuery.orderBy(table[key], dir as 'asc' | 'desc')
      })
    }

    // limit/offset
    dataQuery = dataQuery.limit(pageSize).offset(offset)

    // 额外 SQL（仅在需要时追加原始片段）
    if (extraSql) {
      // 将 extraSql 附着到查询的 where 位置或直接作为原始片段追加（视场景）
      // 这里尽量以安全方式将其追加到 where（如果是 JOIN，请改为显式在调用处组合）
      dataQuery = dataQuery.where(extraSql)
    }

    // 总数查询（独立执行，不加 limit/offset）
    let countQuery: any = this.db
      .select({ count: sql`COUNT(*)` })
      .from(table)
    if (whereClauses.length)
      countQuery = countQuery.where(and(...whereClauses))
    if (extraSql)
      countQuery = countQuery.where(extraSql)

    // 并行查询，提高性能
    const [countRes, rows] = await Promise.all([countQuery, dataQuery])

    const total = Number(countRes?.[0]?.count ?? 0)

    // 处理返回数据：去除 exclude 指定的字段（如果未显式传 columns）
    const list = (rows || []).map((r: any) => {
      const obj = { ...r } as Record<string, any>
      if (!columns && exclude && exclude.length) {
        exclude.forEach((k) => {
          delete obj[String(k)]
        })
      }
      return obj as T
    })

    return {
      list,
      total,
      page,
      pageSize,
    }
  }

  /**
   * 辅助：模糊匹配
   * @param field user.name
   * @param value dto.name
   */
  likeCondition(field: any, value?: string) {
    return value ? sql`${field} LIKE ${`%${value}%`}` : undefined
  }

  /**
   * 辅助：等值匹配
   * @param field user.name
   * @param value dto.name
   */
  eqCondition(field: any, value?: any) {
    return value !== undefined ? sql`${field} = ${value}` : undefined
  }
}
