export default {
  data () {
    return {
      isSaveData: false
    }
  },
  methods: {
    restData () {
      Object.assign(this.$data, this.$options.data())
    }
  },
  beforeRouteLeave (to, from, next) {
    this.restData()
    next()
  }
}
