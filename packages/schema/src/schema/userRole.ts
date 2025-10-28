import { datetime, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { createId, role, user } from './index'
import { sql } from 'drizzle-orm'

export const userRole = mysqlTable('user_role_relation', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),

  userId: varchar('user_id', { length: 10 })
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),

  roleId: varchar('role_id', { length: 10 })
    .notNull()
    .references(() => role.id, { onDelete: 'cascade' }),

  createTime: datetime('create_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updateTime: datetime('update_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
})


