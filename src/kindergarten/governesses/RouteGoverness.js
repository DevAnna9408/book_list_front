import { HeadGoverness } from 'vue-kindergarten'
import store from '@/store'

export default class RouteGoverness extends HeadGoverness {
  guard (action, { next }) {
    let isUser = store.getters['users/isUser']
    return this.isAllowed(action) ? next() : next({
      name: isUser ? 'user-board' : 'user-login'
    })
  }
}
