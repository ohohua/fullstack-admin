import { sql } from 'drizzle-orm'
import { datetime, int, json, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { createId } from '.'

export const menu = mysqlTable('menu', {
  id: varchar('id', { length: 10 })
    .primaryKey()
    .$defaultFn(() => createId()),

  /**
   * 父级菜单id
   */
  parentId: varchar('parent_id', { length: 10 }),
  /**
   * 菜单类型：0-目录，1-菜单
   */
  type: int().notNull().default(0),
  /**
   * 路由地址
   */
  path: varchar({ length: 255 }).notNull(),
  /**
   * 前端组件
   */
  component: varchar({ length: 255 }),
  /**
   * 重定向配置
   */
  redirect: json('redirect'),
  /**
   * 路由元属性, 会自动序列化
   */
  meta: json('meta').notNull(), 
  // /**
  //  * 图标
  //  */
  // icon: varchar({ length: 255 }),
  // /**
  //  * 菜单国际化标题 key
  //  */
  // titleI18nKey: varchar('title_i18_key', { length: 255 }),
  // /**
  //  * 外链模式 iframe-内嵌 newWindow-外链
  //  */
  // linkMode: varchar('link_mode', { length: 20 }),
  // // meta
  // /**
  //  * 菜单标题
  //  */
  // title: varchar({ length: 255 }),
  // /**
  //  * 外接地址
  //  */
  // link: text(),
  // /**
  //  * 菜单排序
  //  */
  // order: int(),
  // /**
  //  * 是否隐藏菜单
  //  */
  // hideInMenu: boolean('hid_in_menu').default(false),
  // /**
  //  * 是否在标签页隐藏
  //  */
  // hideInTabs: boolean('hide_in_tabs').default(false),
  // /**
  //  * 是否在面包屑隐藏
  //  */
  // hideInBreadcrumb: boolean('hide_in_breadcrumb').default(false),
  // /**
  //  * 是否缓存页面
  //  */
  // keepAlive: boolean('keep_alive').default(false),
  // /**
  //  * 页面包含布局
  //  */
  // layout: boolean().default(false),

  createTime: datetime('create_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  // 更新时间：自动更新为当前时间
  updateTime: datetime('update_time', { mode: 'string' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
})
