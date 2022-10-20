<template>
  <div id="nav-language">
    <div
      v-for="(lang, i) in langs"
      :key="`Lang${i}`"
      :value="lang.code"
      @click="_setLang(lang.code)"
    >
    <a class="btn gradient-btn small"
      v-show="currentLocale !== lang.code"
      @click="_setLang(lang.code)"
    >
      {{ lang.name }}
    </a>
    </div>
  </div>
</template>

<script>
import language from '@/mixins/language.js'
export default {
  name: 'nav-language',
  props: {
    fontColor: {
      type: String,
      default: 'font-white'
    }
  },
  mixins: [language],
  data () {
    return {
      langs: [{ code: 'ko', name: '한국어' }, { code: 'en', name: 'English' }]

    }
  },
  methods: {
    _setLang (lang) {
      this.setLang(lang)
    }
  }
}
</script>
<i18n>
{
  "en": {
    "label": "language"
  },
  "ko": {
    "label": "언어"
  }
}
</i18n>
<style scoped>
</style>
