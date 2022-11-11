import {
  HeadGoverness
} from 'vue-kindergarten'

export default class RoutePramGoverness extends HeadGoverness {
  guard (action, {
    to,
    next
  }) {
    return this.isAllowed(action, to.params.creId) ? next() : next({
      name: 'user-login'
    })
  }
}
