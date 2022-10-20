
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    openLoading () {
      this.loading = true
    },
    closeLoading () {
      this.loading = false
    }
  }
}
