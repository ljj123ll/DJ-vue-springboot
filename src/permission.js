import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
// router：Vue Router 实例，用于路由导航和管理。
// store：Vuex Store 实例，用于状态管理。
// Message：Element UI 的消息提示组件，用于在页面显示消息。
// NProgress：一个进度条库，用于在页面加载时显示加载进度。
// 配置 NProgress：
// 调用 NProgress.configure() 方法配置进度条显示。
// 定义白名单：
// whiteList 数组定义了一组无需登录即可访问的页面路径。
// 路由守卫：
// router.beforeEach() 注册了一个全局的路由前置守卫，用于在每次路由切换前执行一些逻辑。
// 在路由切换前，进度条会开始显示，并设置页面标题。
// 它会判断用户是否已经登录（通过 getToken() 方法获取用户的登录状态），如果已登录，则进一步判断是否已获取用户信息。
// 如果用户已登录但未获取用户信息，则会调用 store.dispatch('user/getInfo') 方法获取用户信息。
// 如果用户未登录且访问的页面不在白名单中，则会重定向到登录页面，并在 URL 中携带当前页面路径作为重定向参数。
// router.afterEach() 注册了一个全局的路由后置守卫，用于在每次路由切换后执行一些逻辑。
// 在路由切换后，进度条会结束显示

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
