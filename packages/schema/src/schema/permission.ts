import { relations } from 'drizzle-orm'
import { mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { createId, rolePermission } from './index'

export const permission = mysqlTable('permission', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar({ length: 255 }),
  code: varchar({ length: 64 }).notNull().unique(), // 权限标识
  description: text(),
  createTime: timestamp('create_time').notNull().defaultNow(),
  updatedTime: timestamp('updated_time').notNull().defaultNow().onUpdateNow(),
})

export const permissionsRelations = relations(permission, ({ many }) => ({
  // 权限关联的角色（通过 rolePermissions 中间表）
  roles: many(rolePermission),
}))
