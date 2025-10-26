import { relations } from 'drizzle-orm'
import { int, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { createId, rolePermission, userRole } from './index'

export const role = mysqlTable('role', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar({ length: 20 }).notNull().unique(),
  code: varchar({ length: 20 }).notNull().unique(),
  remark: text(),
  status: int().notNull().default(0),
  createTime: timestamp('create_time').notNull().defaultNow(),
  updatedTime: timestamp('updated_time').notNull().defaultNow().onUpdateNow(),
})

/**
 * 定义表关系（relations）
 * 用于查询时自动关联数据（不影响数据库物理结构）
 */
export const rolesRelations = relations(role, ({ many }) => ({
  // 角色关联的权限（通过 rolePermissions 中间表）
  permissions: many(rolePermission),
  // 角色关联的用户（通过 userRoles 中间表）
  users: many(userRole),
}))
