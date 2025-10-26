import { relations } from 'drizzle-orm'
import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { createId, permission, role } from './index'

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

  createTime: timestamp('create_time')
    .notNull()
    .defaultNow(),

  updatedTime: timestamp('updated_time')
    .notNull()
    .defaultNow()
    .onUpdateNow(),
})

export const rolePermissionRelation = relations(rolePermission, ({ one }) => ({
  // 中间表关联到角色
  role: one(role, {
    fields: [rolePermission.roleId],
    references: [role.id],
  }),
  // 中间表关联到权限
  permission: one(permission, {
    fields: [rolePermission.permissionId],
    references: [permission.id],
  }),
}))
