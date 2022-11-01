export default {
  methods: {
    bookRouterPush (_name, _params) {
      let params = {
        ..._params,
        routeKey: process.env.VUE_APP_ROUTE_DATA_KEY
      }
      if (_name === this.$route.name) {
        this.$router.push({
          name: 'routertemp',
          params: {
            ...params,
            name: _name
          }
        })
      } else {
        this.$router.push({
          name: _name,
          params: params
        })
      }
    }
  }
}
