<template>
  <div id="app">
    <loading-full v-if="loading"></loading-full>
    <error-toast></error-toast>
    <div id="header" class="site-navigation">
      <router-view name="header" />
    </div>
    <!-- <div id="sidebar" class="sidebar-navigation">
      <router-view name="sidebar" />
    </div> -->
    <router-view />
    <router-view name="footer" />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { isChrome } from '@/utils/browserCheck'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({ loading: 'loading' })
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({})
  },

  created () {
    // backspace input, textarea 아니면 적용안됨
    window.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA') {
        e.preventDefault()
      }
    })
    if (!isChrome()) { alert('지원하지 않는 브라우저 입니다. 크롬 브라우저를 사용해주세요.\nThis browser is not supported.Please use a chrome browser') }
  }
}
</script>
<style></style>
<style scoped></style>
