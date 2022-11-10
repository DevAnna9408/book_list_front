<template>
  <footer id="main-footer">
    <div class="container">
      <div class="footer-logo">
        <img
          src="@/assets/img/logo.png"
          alt="logo"
          @click="$router.push({ name: 'user-board' })"
        >
      </div>
      <div class="footer-address">
        {{ year }}, made by Anna
      </div>
    </div>
  </footer>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'main-footer',
  components: {},
  props: {
    backgroundColor: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      year: new Date().getFullYear()
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({})
  }
}
</script>
<style>
</style>
<style scoped>
</style>
<style lang="scss">
</style>
