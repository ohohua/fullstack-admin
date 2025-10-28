import { sql } from 'drizzle-orm'
import { datetime, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { createId } from './index'

export const user = mysqlTable('user', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),
  username: varchar({ length: 20 }).notNull().unique(),
  nickname: varchar({ length: 20 }).notNull(),
  gender: int().notNull().default(-1),
  password: varchar({ length: 64 }).notNull(),
  email: varchar({ length: 64 }).notNull().unique(),
  phone: varchar({ length: 20 }).notNull(),
  remark: varchar({ length: 255 }),
  status: int().default(0),

  createTime: datetime('create_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updateTime: datetime('update_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
})
