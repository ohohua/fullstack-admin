import { sql } from 'drizzle-orm'
import { datetime, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { createId } from './index'

export const userRole = mysqlTable('user_role_relation', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),

  userId: varchar('user_id', { length: 10 }).notNull(),

  roleId: varchar('role_id', { length: 10 }).notNull(),

  createTime: datetime('create_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updateTime: datetime('update_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
})
