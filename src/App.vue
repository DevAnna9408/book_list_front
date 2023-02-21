<template>
  <div id="app">
    <loading-full v-if="loading"></loading-full>
    <div id="header" class="site-navigation">
      <router-view name="header" />
    </div>
    <router-view />
    <div class="footer">
      <router-view name="footer" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import { isChrome } from '@/utils/browserCheck'
export default {
  name: 'App',
  computed: {
    ...mapGetters({ loading: 'loading' })
  },
  created () {
    // backspace input, textarea 아니면 적용안됨
    window.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA') {
        e.preventDefault()
      }
    })
    // if (!isChrome()) { alert('지원하지 않는 브라우저 입니다. 크롬 브라우저를 사용해주세요.\nThis browser is not supported.Please use a chrome browser') }
  }
}
</script>
<style></style>
<style lang="scss">
.footer {
@media screen and (max-width: 600px) {
  display: none;
}
}
</style>
