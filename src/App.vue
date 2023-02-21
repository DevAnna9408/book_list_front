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
export default {
  name: 'App',
  computed: {
    ...mapGetters({ loading: 'loading' })
  },
  created () {
    window.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA') {
        e.preventDefault()
      }
    })
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
