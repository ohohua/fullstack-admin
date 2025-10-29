export const accessRoutes = [
  {
    path: '/home',
    component: '/home/index.vue',
    type: 1,
    meta: {
      title: '首页',
      titleI18nKey: 'routes.home',
      icon: 'material-symbols:dashboard-outline-rounded',
      fixedInTabs: true,
    },
  },
  {
    path: '/demos',
    children: [
      {
        path: 'access',
        children: [
          {
            path: 'toggle',
            component: '/demos/access/toggle/index.vue',
            meta: {
              title: '权限切换',
              titleI18nKey: 'routes.accessToggle',
              icon: 'mdi:page-previous-outline',
            },
          },
        ],
        meta: {
          title: '权限',
          titleI18nKey: 'routes.access',
          icon: 'material-symbols:lock-outline',
        },
      },
      {
        path: 'fallback',
        children: [
          {
            path: '403',
            component: '/demos/fallback/403.vue',
            meta: {
              title: '403',
              titleI18nKey: 'routes.403',
              icon: 'mdi:forbid',
            },
          },
          {
            path: '404',
            component: '/demos/fallback/404.vue',
            meta: {
              title: '404',
              titleI18nKey: 'routes.404',
              icon: 'ic:baseline-browser-not-supported',
            },
          },
          {
            path: '500',
            component: '/demos/fallback/500.vue',
            meta: {
              title: '500',
              titleI18nKey: 'routes.500',
              icon: 'streamline-flex:monitor-error',
            },
          },
        ],
        meta: {
          title: '异常页',
          titleI18nKey: 'routes.exception',
          icon: 'solar:shield-warning-broken',
        },
      },
      {
        path: 'external',
        meta: {
          title: '外部页面',
          titleI18nKey: 'routes.externalPage',
          icon: 'ant-design:link-outlined',
        },
        children: [
          {
            path: 'iframe',
            children: [
              {
                path: 'form',
                meta: {
                  title: '复杂表单',
                  titleI18nKey: 'routes.complexForm',
                  icon: 'lets-icons:form',
                  link: 'https://naive-ui.pro-components.cn/zh-CN/os-theme/components/form-list#list-nest.vue',
                  linkMode: 'iframe',
                },
              },
              {
                path: 'edit-data-table',
                meta: {
                  title: '编辑表格',
                  titleI18nKey: 'routes.editTable',
                  icon: 'material-symbols:table-outline',
                  link: 'https://naive-ui.pro-components.cn/zh-CN/os-theme/components/edit-data-table#async.vue',
                  linkMode: 'iframe',
                },
              },
              {
                path: 'baidu-iframe',
                meta: {
                  title: '百度',
                  titleI18nKey: 'routes.baiduIframe',
                  icon: 'ri:baidu-fill',
                  link: 'https://www.baidu.com',
                  linkMode: 'iframe',
                },
              },
              {
                path: 'menu',
                component: '/system/menu/index.vue',
                meta: {
                  title: '菜单管理',
                  titleI18nKey: 'routes.menuManagementIframe',
                  link: true,
                  linkMode: 'iframe',
                },
              },
            ],
            meta: {
              title: '内嵌',
              titleI18nKey: 'routes.embedded',
              icon: 'material-symbols:iframe',
            },
          },
          {
            path: 'link',
            children: [
              {
                path: 'vite',
                meta: {
                  icon: 'logos:vitejs',
                  title: 'Vite',
                  link: 'https://vite.dev',
                },
              },
              {
                path: 'vue',
                meta: {
                  icon: 'logos:vue',
                  title: 'Vue',
                  link: 'https://vuejs.org/',
                },
              },
              {
                path: 'menu-layout-falsy',
                component: '/system/menu/index.vue',
                meta: {
                  title: '无布局',
                  titleI18nKey: 'routes.noLayout',
                  layout: false,
                  link: true,
                },
              },
              {
                path: 'menu',
                component: '/system/menu/index.vue',
                meta: {
                  title: '菜单管理',
                  titleI18nKey: 'routes.menuManagementExternal',
                  link: true,
                },
              },
            ],
            meta: {
              title: '外链',
              titleI18nKey: 'routes.externalLink',
              icon: 'akar-icons:link-out',
            },
          },
        ],
      },
      {
        path: 'download',
        name: 'Download',
        component: '/demos/download/index.vue',
        meta: {
          title: '文件下载',
          titleI18nKey: 'routes.fileDownload',
          icon: 'material-symbols:download',
        },
      },
      {
        path: 'nested-detail',
        component: '/demos/nested/index.vue',
        children: [
          {
            path: 'detail',
            component: '/demos/nested/detail.vue',
            meta: {
              title: '详情页',
              titleI18nKey: 'routes.detail',
              hideInMenu: true,
            },
          },
        ],
        meta: {
          title: '嵌套详情页',
          titleI18nKey: 'routes.nestedDetail',
          icon: 'bx:detail',
        },
      },
      {
        path: 'nested-detail2',
        component: '/demos/nested/demo2/index.vue',
        redirect: { name: 'nestedDetail2:detail1' }, //
        children: [
          {
            path: 'detail1',
            name: 'nestedDetail2:detail1',
            component: '/demos/nested/demo2/detail1.vue',
            meta: {
              title: '详情页（1）',
              titleI18nKey: 'routes.detail1',
              hideInMenu: true,
            },
          },
          {
            path: 'detail2',
            name: 'nestedDetail2:detail2',
            component: '/demos/nested/demo2/detail2.vue',
            meta: {
              title: '详情页（2）',
              titleI18nKey: 'routes.detail2',
              hideInMenu: true,
            },
          },
        ],
        meta: {
          title: '嵌套详情页（2）',
          titleI18nKey: 'routes.nestedDetail2',
          icon: 'bx:detail',
          nestedRouteRenderEnd: true,
        },
      },
      {
        path: 'keep-alive',
        children: [
          {
            path: 'demo1',
            component: '/demos/keep-alive/demo1.vue',
            meta: {
              title: '基础缓存',
              titleI18nKey: 'routes.keepAliveDemo1',
              keepAlive: true,
            },
          },
          {
            path: 'demo2',
            component: '/demos/keep-alive/demo2.vue',
            meta: {
              title: '条件缓存',
              titleI18nKey: 'routes.keepAliveDemo2',
              keepAlive: {
                include: ['Tabs'],
              },
            },
          },
        ],
        meta: {
          title: '缓存路由',
          titleI18nKey: 'routes.keepAlive',
          icon: 'octicon:cache-16',
        },
      },
      {
        path: 'tabs',
        name: 'Tabs',
        component: '/demos/tabs/index.vue',
        meta: {
          title: '多标签',
          titleI18nKey: 'routes.tabs',
          icon: 'mdi:tab',
        },
      },
      {
        path: 'page-component',
        component: '/demos/page-component/index.vue',
        meta: {
          title: '页面级组件',
          titleI18nKey: 'routes.pageComponent',
          icon: 'material-symbols:pageview-outline',
        },
      },
      {
        path: 'editor',
        component: '/demos/wang-editor/index.vue',
        meta: {
          title: '富文本',
          titleI18nKey: 'routes.richText',
          icon: 'material-symbols:edit-document-outline',
        },
      },
      {
        path: 'complex-form',
        component: '/demos/complex-form/index.vue',
        meta: {
          title: '复杂表单',
          titleI18nKey: 'routes.complexForm',
          icon: 'material-symbols:dynamic-form-outline',
        },
      },
      {
        path: 'icon',
        component: '/demos/icon/index.vue',
        meta: {
          title: '图标选择器',
          titleI18nKey: 'routes.iconSelector',
          icon: 'mdi:image-outline',
        },
      },
      {
        path: 'loading',
        component: '/demos/loading/index.vue',
        meta: {
          title: 'Loading 指令',
          titleI18nKey: 'routes.loading',
          icon: 'line-md:loading-twotone-loop',
        },
      },
    ],
    meta: {
      title: '演示',
      titleI18nKey: 'routes.demo',
      icon: 'hugeicons:codesandbox',
    },
  },
  {
    path: '/system',
    children: [
      {
        path: 'user',
        component: '/system/user/index.vue',
        meta: {
          title: '用户管理',
          titleI18nKey: 'routes.userManagement',
          icon: 'ant-design:user-outlined',
          roles: ['super', 'admin'],
        },
      },
      {
        path: 'role',
        component: '/system/role/index.vue',
        meta: {
          title: '角色管理',
          titleI18nKey: 'routes.roleManagement',
          icon: 'carbon:user-role',
          roles: ['super'],
        },
      },
      {
        path: 'menu',
        component: '/system/menu/index.vue',
        meta: {
          title: '菜单管理',
          titleI18nKey: 'routes.menuManagement',
          roles: ['super'],
        },
      },
    ],
    meta: {
      title: '系统管理',
      titleI18nKey: 'routes.system',
      icon: 'ant-design:setting-outlined',
      roles: ['super', 'admin'],
    },
  },
]
