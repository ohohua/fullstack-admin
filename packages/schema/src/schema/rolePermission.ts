import { sql } from 'drizzle-orm'
import { datetime, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { createId } from './index'

export const rolePermission = mysqlTable('role_permission', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),

  roleId: varchar('role_id', { length: 10 })
    .notNull(),

  permissionId: varchar('permission_id', { length: 10 })
    .notNull(),

  createTime: datetime('create_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updateTime: datetime('update_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
})
