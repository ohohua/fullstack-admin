import { datetime, mysqlTable, text, varchar } from 'drizzle-orm/mysql-core'
import { createId } from './index'
import { sql } from 'drizzle-orm'

export const permission = mysqlTable('permission', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar({ length: 255 }),
  code: varchar({ length: 64 }).notNull().unique(), // 权限标识
  description: text(),

 createTime: datetime('create_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  // 更新时间：自动更新为当前时间
  updateTime: datetime('update_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`), 
})
