import { boolean, int, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core'
import { createId } from '.'

export const menu = mysqlTable('menu', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),

  /**
   * 菜单类型：0-目录，1-菜单
   */
  type: int().notNull().default(0),
  /**
   * 路由地址
   */
  path: varchar({ length: 255 }).notNull().unique(),
  /**
   * 前端组件
   */
  component: varchar({ length: 255 }).notNull(),
  /**
   * 图标
   */
  icon: varchar({ length: 255 }),
  /**
   * 菜单国际化标题 key
   */
  titleI18nKey: varchar({ length: 255 }),
  /**
   * 外链模式 0-内嵌 1-外链
   */
  linkMode: int('link_mode').notNull().default(0),
  // meta
  /**
   * 菜单标题
   */
  title: varchar({ length: 255 }),
  /**
   * 外接地址
   */
  link: text(),
  /**
   * 菜单排序
   */
  order: int(),
  /**
   * 是否隐藏菜单
   */
  hideInMenu: boolean().default(false),
  /**
   * 是否在标签页隐藏
   */
  hideInTabs: boolean().default(false),
  /**
   * 是否在面包屑隐藏
   */
  hideInBreadcrumb: boolean().default(false),
  /**
   * 是否缓存页面
   */
  keepAlive: boolean().default(false),
  /**
   * 页面包含布局
   */
  layout: boolean().default(false),

  createTime: timestamp('create_time').notNull().defaultNow(),
  updatedTime: timestamp('updated_time').notNull().defaultNow().onUpdateNow(),
})
