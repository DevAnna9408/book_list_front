export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    }

  },
  watch: {
    show: {
      immediate: true,
      handler (isActive) {
        this.active = isActive
      }
    },
    isActive (isActive) {
      this.$emit('update:show', isActive)
    }
  },
  data () {
    return {
      active: false
    }
  },
  computed: {
    isActive () {
      return this.active
    }
  },
  methods: {

  },
  created () {
    this.active = this.show
  }
}
