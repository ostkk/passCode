import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    const type = hasToken.split('-')[0];
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      const fromPath = GetUrlRelativePath(window.location.href)
      if (hasGetUserInfo) {
        if (store.getters.reFresh) {
          store.dispatch('user/reFresh');
          store.dispatch("user/addRoute", type);
          next({ path: fromPath })
        } else
          next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          if (store.getters.reFresh) {
            store.dispatch('user/reFresh');
            store.dispatch("user/addRoute", type);
            next({ path: fromPath })
          } else
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

function GetUrlRelativePath(url) {
  var arrUrl = url.split('//')

  var start = arrUrl[1].indexOf('/')
  var relUrl = arrUrl[1].substring(start)
  if (relUrl.indexOf('?') !== -1) {
    relUrl = relUrl.split('?')[0]
  }
  return relUrl.substring(2)
}