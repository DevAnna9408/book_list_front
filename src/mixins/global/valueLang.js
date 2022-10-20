import {
  mapGetters
} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      currentLocale: 'i18N/currentLocale'
    }),
    valueByCurrentLang () {
      return (korName, enName) => {
        return this.currentLocale === 'ko' ? korName : enName
      }
    },
    arrayValueByCurrentLang () {
      return (array) => {
        return this.currentLocale === 'ko' ? array[0] : array[1]
      }
    }
  }
}
