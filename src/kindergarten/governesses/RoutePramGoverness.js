import { HeadGoverness } from 'vue-kindergarten'
import store from '@/store'
export default class RoutePramGoverness extends HeadGoverness {
  guard (action, { from, to, next }) {
    // 새로고침&url직접 접근 불가
    if (to.params.apexkey === process.env.VUE_APP_APEX_ROUTE_DATA_KEY) {
      let isUser = store.getters['users/isUser']
      return this.isAllowed(action) ? next() : next({
        name: isUser ? 'user-board' : 'user-login'
      })
    } else {
      store.dispatch('errors/populateErrors', {
        detail: {
          message: '올바르지 않은 접근입니다 Incorrect approach'
        }
      })
      next({
        name: to.meta.goHome ? 'user-board' : 'user-login'
      })
    }
  }
}
