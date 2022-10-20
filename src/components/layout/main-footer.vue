<template>
  <footer id="main-footer">
    <div class="container">
      <div class="footer-logo">
        <!-- FIXME: [프로젝트 초기설정] 로고 변경필요 -->
        <img
          src="@/assets/img/logo@2x.png"
          alt="apexFW"
          @click="$router.push({ name: 'home-main' })"
        >
      </div>
      <div class="footer-address">
        {{ year }}, made by
        <a
          href="http://www.apexsoft.co.kr/"
          target="_blank"
        >Anna</a>
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
