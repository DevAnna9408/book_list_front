import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import routes from './routes'
import {
  i18n
} from '@/plugins/i18n'

import * as perimeters from '@/kindergarten/perimeters'
import child from '@/kindergarten/child'
import {
  createSandbox
} from 'vue-kindergarten'
import RouteGoverness from '@/kindergarten/governesses/RouteGoverness'
import typeUtil from '@/utils/type'

Vue.use(Router)

// 현재위치로 이동 시킬때 에러처리
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') throw err
  })
}

let router = new Router({
  mode: 'history',
  scrollBehavior: to => {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes
})
// title 설정하기(전체)
router.afterEach((to, from, next) => {
  document.title = i18n.t(to.meta.title)
})

router.beforeEach((to, from, next) => {
  store.commit('SET_PREPAGE', from.fullPath)

  let perimeter = null

  to.matched.some((routeRecord) => {
    if (!typeUtil.isNullOrUndefined(routeRecord.meta.perimeter)) {
      perimeter = perimeters[routeRecord.meta.perimeter]
    }

    const Governess = routeRecord.meta.governess || RouteGoverness
    const action = routeRecord.meta.perimeterAction || 'read'
    if (perimeter) {
      const sandbox = createSandbox(child(store), {
        governess: new Governess(),

        perimeters: [
          perimeter
        ]
      })
      return sandbox.guard(action, {
        from,
        to,
        next
      })
    }
    return next()
  })
})
export default router
