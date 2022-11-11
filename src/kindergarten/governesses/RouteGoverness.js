import {
  HeadGoverness
} from 'vue-kindergarten'

export default class RouteGoverness extends HeadGoverness {
  guard (action, path, { next }) {
    return this.isAllowed(action) ? next() : next({ name: path })
  }
}
