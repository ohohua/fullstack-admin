import { relations } from 'drizzle-orm'
import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { createId, userRole } from './index'

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
  createTime: timestamp('create_time').notNull().defaultNow(),
  updatedTime: timestamp('updated_time').notNull().defaultNow().onUpdateNow(),
})

export const usersRelations = relations(user, ({ many }) => ({
  // 用户关联的角色（通过 userRoles 中间表）
  roles: many(userRole),
}))
