import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Ads from 'vue-google-adsense'
import '@/plugins'
import { i18n } from '@/plugins/i18n'

Vue.use(require('vue-script2'))
Vue.use(Ads.Adsense)

require('@/assets/css/style.scss')
require('@/assets/css/book.scss')

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
