import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
  Vue 和 Router 导入：首先导入 Vue 和 Vue Router，并通过 Vue.use(Router) 使用 Vue Router。
  Layout 组件导入：导入了项目中的布局组件 Layout，这是项目中其他页面组件的父布局，用于包裹其他页面组件。
  constantRoutes 常量：定义了项目的路由配置信息，包括路由路径、对应的组件以及页面的元信息。这些路由配置可以分为两类：
  一类是不受权限控制的常规路由，另一类是需要权限控制的动态路由（在这个文件中没有动态路由配置）。
  createRouter 函数：定义了一个用于创建路由实例的函数 createRouter()，它返回一个新的 Vue Router 实例，
  路由配置为 constantRoutes 中定义的路由信息。
  router 实例：通过调用 createRouter() 函数创建了一个 Vue Router 实例，
  并导出为默认导出。这个路由实例在整个应用中可以被访问到，用于进行路由导航。
  resetRouter 函数：定义了一个重置路由的函数 resetRouter()，它用于在用户退出登录时重置路由状态，避免路由缓存导致的权限问题
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  {
    path: '/screen_home',
    component: () => import('@/views/bigscreen/screen_home')
  },
  {
    path: '/screen_dj',
    component: () => import('@/views/bigscreen/screen_dj')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '后台管理首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '信息', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '通知管理', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '人员信息管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '党建活动创建', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '汇报管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '工作汇报' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: '会议报告' }
      }
    ]
  },
  {
    path: '/m',
    component: Layout,
    redirect: '/m/users',
    name: 'Table',
    meta: {
      title: '管理',
      icon: 'table'
    },
    children: [
      {
        path: 'depts',
        component: () => import('@/views/dept/index'),
        name: 'Depts',
        meta: { title: '部门管理' }
      }
    ]
  },

  /* {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },*/

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
