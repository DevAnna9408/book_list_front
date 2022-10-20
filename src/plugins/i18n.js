import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import store from '@/store'

Vue.use(Cookies)
Vue.use(VueI18n)

function loadLocaleMessages () {
  const locales = require.context('@/assets/lang/general', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      let tmpMessages = messages[locale] || {}
      messages[locale] = Object.assign(tmpMessages, locales(key))
    }
  })
  return messages
}
export const i18n = new VueI18n({
  silentTranslationWarn: true,
  locale: Cookies.get('locale') || process.env.VUE_APP_I18N_LOCALE,
  fallbackLocale: Cookies.get('locale') || process.env.VUE_APP_I18N_FALLBACK_LOCALE,
  messages: loadLocaleMessages()
})

export const setLocale = (lang, meta) => {
  i18n.locale = lang
  Cookies.set('locale', lang)
  store.commit('i18N/SET_LOCALE', lang)
  document.title = i18n.t(meta.title)
}
