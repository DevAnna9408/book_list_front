import Cookies from 'js-cookie'
import Vue from 'vue'
Vue.use(Cookies)
const state = () => ({
  locale: Cookies.get('locale') || process.env.VUE_APP_I18N_LOCALE
})

const getters = {
  currentLocale: state => state.locale
}

const mutations = {
  SET_LOCALE: (state, _lang) => {
    state.locale = _lang
  }
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
