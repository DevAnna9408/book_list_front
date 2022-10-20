<template>
  <div id="user-login" class="single-small-box bg-grey base-height">
    <div class="container">
      <div class="small-box">
        <div class="page-title-and-information">
          <div class="preset">
            <h1>{{ $t("user.login") }}</h1>
            <p>{{ $t("login_label") }}</p>
          </div>
          <div class="custom">
            <!-- FIXME: [프로젝트 초기설정] 로그인 로고 변경필요 -->
            <img id="circle-logo" src="@/assets/img/logo-circle@2x.png" alt="apexFW 원형로고" />
          </div>
        </div>
        <ValidationObserver v-slot="{ passes }">
          <form @submit.prevent="passes(_login)">
            <div class="input-group without-label">
              <input-text
                v-model="userId"
                name="userId"
                :label="$t('attributes.userId')"
                rules="required"
                input-type="text"
                error-msg-class="errors-msg"
                :placeholder="$t('user.id_placeholder')"
              ></input-text>
            </div>
            <div class="input-group without-label">
              <input-text
                v-model="password"
                name="password"
                :label="$t('attributes.password')"
                :rules="{ required: true, max: 16, regex: /(?=.*\d{1,})(?=.*[~`!@#$%\^&*()-+=]{1,})(?=.*[a-z]{1,})(?=.*[A-Z]{1,}).{8,16}$/ }"
                input-type="password"
                error-msg-class="errors-msg"
                :placeholder="$t('user.pw_placeholder')"
              ></input-text>
            </div>
            <div>
              <button data-cy="login" class="btn gradient-btn">{{ $t("user.login") }}</button>
            </div>

            <div>
              <user-captcha
                :user-id="captcha.userId"
                :response.sync="captcha.response"
                :is-show="captcha.isShow"
              ></user-captcha>
            </div>

            <div class="user-login-other-actions">
              <div class="left">
                <router-link :to="{ name: 'user-agree' }">{{ $t("user.sing_up") }}</router-link>
              </div>
              <div class="right" :class="{ kor : currentLocale == 'ko' }">
                <!-- FIXME: 현재 아이디 찾기 FW에서 제공되지 않는 기능  사용시 주석제거-->
                <!-- <router-link :to="{ name: 'user-find-id' }">{{ $t("user.find.id") }}</router-link> -->
                <router-link :to="{ name: 'user-find-pwd' }">{{ $t("user.find.pw") }}</router-link>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import userCaptcha from '@/views/user-captcha'

export default {
  name: 'user-login',
  components: { 'user-captcha': userCaptcha },
  mixins: [],
  data () {
    return {
      userId: '',
      password: '',
      captcha: {
        userId: '',
        isShow: false,
        response: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      prepage: 'prepage'
    }),
    checkCaptcha () {
      return this.captcha.isShow ? this.captcha.response : true
    }
  },
  methods: {
    ...mapMutations({}),
    ...mapActions('users', ['login']),
    _showCaptcha (userId) {
      this.captcha.userId = userId
      this.captcha.isShow = true
      this.captcha.response = ''
    },
    _login () {
      if (this.checkCaptcha) {
        this.captcha.isShow = false // watch 때문필요
        let userId = this.userId
        let password = this.password
        this.login({ userId, password })
          .then(() => {
            const firstPrefix = this.prepage.substr(1).split('/')
            if (this.prepage && firstPrefix[0] !== 'user') this.$router.push(this.prepage)
            else this.$router.push({ name: 'home-main' })
          })
          .catch(_err => {
            if (_err.exceptionName === 'UserLockException') {
              this._showCaptcha(userId)
            }
          })
      }
    }
  }
}
</script>
<i18n>
{
  "en": {
    "login_label" :"Enter your login information"
  },
  "ko": {
    "login_label" :"로그인 정보 입력"
  }
}
</i18n>
<style scoped></style>
