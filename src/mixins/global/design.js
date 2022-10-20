export default {
  mounted () {
    let { bodyClass } = this.$options
    if (bodyClass) {
      document.body.classList.add(bodyClass)
    }
  },
  beforeDestroy () {
    let { bodyClass } = this.$options
    if (bodyClass) {
      document.body.classList.remove(bodyClass)
    }
  }
}
