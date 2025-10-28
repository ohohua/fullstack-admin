import { datetime, int, mysqlTable, text, varchar } from 'drizzle-orm/mysql-core'
import { createId } from './index'
import { sql } from 'drizzle-orm'

export const role = mysqlTable('role', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar({ length: 20 }).notNull().unique(),
  code: varchar({ length: 20 }).notNull().unique(),
  remark: text(),
  status: int().notNull().default(0),

  createTime: datetime('create_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  // 更新时间：自动更新为当前时间
  updateTime: datetime('update_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
})
