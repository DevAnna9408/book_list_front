import { setLocale } from '@/plugins/i18n'
import { localize } from 'vee-validate'
export default {
  methods: {
    setLang (lang) {
      setLocale(lang, this.$route.meta)
      localize(lang)
    }
  }
}
