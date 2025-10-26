import { relations } from 'drizzle-orm'
import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { createId, role, user } from './index'

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

  createTime: timestamp('create_time')
    .notNull()
    .defaultNow(),

  updatedTime: timestamp('updated_time')
    .notNull()
    .defaultNow()
    .onUpdateNow(),
})

export const userRoleRelation = relations(userRole, ({ one }) => ({
  // 中间表关联到用户
  user: one(user, {
    fields: [userRole.userId],
    references: [user.id],
  }),
  // 中间表关联到角色
  role: one(role, {
    fields: [userRole.roleId],
    references: [role.id],
  }),
}))
