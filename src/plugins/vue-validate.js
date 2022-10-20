import Vue from 'vue'
import { ValidationProvider, extend, ValidationObserver, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import ko from 'vee-validate/dist/locale/ko.json'
import en from 'vee-validate/dist/locale/en.json'

import {
  i18n
} from '@/plugins/i18n'
const customValidate = require.context('@/assets/lang/veeValidate', true, /[A-Za-z0-9-_,\s]+\.json$/i)

// loop over all rules
for (let rule in rules) {
  extend(rule, rules[rule])
}

const customLocalize = {}
customValidate.keys().forEach(key => {
  const matched = key.match(/([A-Za-z0-9-_]+)\./i)
  if (matched && matched.length > 1) {
    const locale = matched[1]
    let tmpMessages = customLocalize[locale] || {}
    customLocalize[locale] = Object.assign(tmpMessages, customValidate(key))
  }
})

localize(i18n.locale)
localize({
  ko: Object.assign(ko, customLocalize.ko),
  en: Object.assign(en, customLocalize.en)
})
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
