<template>
  <div id="user-captcha">
    <vue-recaptcha
      v-if="isReCaptchaShow"
      ref="recaptcha"
      :sitekey="rcapt_sig_key"
      @verify="onVerify"
      @expired="onExpired"
    ></vue-recaptcha>
  </div>
</template>

<script>
import ajax from '@/wrapper/ajax.js'
export default {
  name: 'user-captcha',
  props: {
    response: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      required: true
    }
  },
  watch: {
    isShow (val) {
      this.isReCaptchaShow = val // prop 변경안됨
    }
  },

  data () {
    return {
      rcapt_sig_key: process.env.VUE_APP_RECHAPCHA_KEY,
      isReCaptchaShow: this.isShow // 동적으로 받기위해서
    }
  },
  methods: {
    onVerify (r) {
      // 캡차 풀기 호출
      ajax('GET', '/captcha/success', null, null, { userId: this.userId })
        .then(() => {
          this.$emit('update:response', r)
          this.isReCaptchaShow = false
          this.resetCaptcha()
        })
        .catch(_err => {
          this.resetCaptcha()
        })
    },
    onExpired () {
      this.$emit('update:response', '')
      this.isReCaptchaShow = true
      this.resetCaptcha()
    },
    resetCaptcha () {
      this.$refs.recaptcha.reset()
    }
  },
  mounted () {}
}
</script>

<style scoped>
</style>
