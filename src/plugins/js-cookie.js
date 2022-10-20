import Vue from 'vue'
import Cookies from 'js-cookie'
let domain = process.env.VUE_APP_FRONT_DOMAIN
Vue.use(Cookies)
Cookies.defaults.domain = domain
Cookies.defaults.expires = 1 // FIXME: 프로젝트 별 수정 필요
