import LoadScript from 'vue-plugin-load-script'
import Vue from 'vue'
import VueRecaptcha from 'vue-recaptcha'

Vue.use(LoadScript)
Vue.loadScript('https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit')
  .then(() => {
    Vue.component('vue-recaptcha', VueRecaptcha)
  })
  .catch((e) => {
  })

Vue.loadScript('https://code.jquery.com/jquery-1.12.4.min.js')
