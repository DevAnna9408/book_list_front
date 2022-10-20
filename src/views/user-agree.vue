<template>
  <div id="user-agree" class="single-small-box bg-grey base-height">
    <div class="container">
      <div class="small-box">
        <div method action>
          <div class="page-title-and-information">
            <div class="preset">
              <h1>{{ $t("user.agree.member") }}</h1>
            </div>
            <div class="custom">
              <h2>{{ $t("user.agree_message") }}</h2>
            </div>
          </div>

          <ValidationObserver ref="observer">
            <form @submit.prevent="_goToRegister">
              <div class="agrmnt-width-accordion">
                <div class="apexFW-checkbox">
                  <agree-box
                    :label="$t('user.agree.terms_of_use')"
                    name="agree1"
                    v-model="agree1"
                    :error-msg-used="false"
                    :content="agreeContent1"
                    rules="required"
                  ></agree-box>
                </div>
              </div>
              <div class="agrmnt-width-accordion">
                <div class="apexFW-checkbox">
                  <agree-box
                    :label="$t('user.agree.information')"
                    name="agree2"
                    v-model="agree2"
                    :error-msg-used="false"
                    :content="agreeContent2"
                    rules="required"
                  ></agree-box>
                </div>
              </div>
              <div class="row">
                <div class="col col-12">
                  <button class="btn gradient-btn">{{ $t("user.register") }}</button>
                </div>
              </div>
            </form>
          </ValidationObserver>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import apxAlert from '@/wrapper/apex-alert.js'
import * as ko from '@/assets/agree-contents/agree.js'
import * as en from '@/assets/agree-contents/agree_en.js'

export default {
  name: 'user-agree',
  bodyClass: 'login-page',
  components: { 'agree-box': () => import('@/components/agree-box') },
  mixins: [],
  data () {
    return {
      agreeContent1: '',
      agreeContent2: '',
      agree1: '',
      agree2: ''
    }
  },
  computed: {
    ...mapGetters({
      lang: 'i18N/currentLocale'
    })
  },
  watch: {
    lang (val) {
      this.changeLang(val)
    }
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({}),
    changeLang (lang) {
      if (lang === 'ko') {
        this.agreeContent1 = ko.agree1
        this.agreeContent2 = ko.agree2
      } else {
        this.agreeContent1 = en.agree1
        this.agreeContent2 = en.agree2
      }
    },
    async _goToRegister () {
      const valid = await this.$refs.observer.validate()
      if (valid) this.$router.push({ name: 'user-register' })
      else apxAlert.warning('', this.$t('all_agree'))
    }
  },
  created () {
    this.changeLang(this.lang)
  }
}
</script>
<style>
</style>
<style scoped>
</style>
<style lang="scss">
</style>
<i18n>
{
  "en": {
    "all_agree": "Please agree to all terms."
  },
  "ko": {
    "all_agree": "약관에 모두 동의해주세요."
  }
}
</i18n>
