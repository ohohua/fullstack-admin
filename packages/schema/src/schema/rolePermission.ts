import { datetime, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { createId, permission, role } from './index'
import { sql } from 'drizzle-orm'

export const rolePermission = mysqlTable('role_permission', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),

  roleId: varchar('role_id', { length: 10 })
    .notNull()
    .references(() => role.id, { onDelete: 'cascade' }),

  permissionId: varchar('permission_id', { length: 10 })
    .notNull()
    .references(() => permission.id, { onDelete: 'cascade' }),

  createTime: datetime('create_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updateTime: datetime('update_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
})
