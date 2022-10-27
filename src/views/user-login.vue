<template>
  <div id="user-login">
    <div
      class="user__login__container"
    >
      <div class="form-wrapper">
        <div
          style="display: flex; justify-content: center; margin: 30px"
        >
          <img
            style="width: 70px;"
            class="loading__logo"
            src="@/assets/img/logo.png"
            alt="logo">
        </div>
        <ValidationObserver v-slot="{ invalid, passes }">
          <form @submit.prevent="passes( _login())">
            <div class="form-item">
              <input-text
                v-model="user.userId"
                name="이메일"
                :label="'이메일'"
                input-type="text"
                :rules="{
              required: true,
              regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
              }"
                error-msg-class="errors-msg"
              ></input-text>
            </div>
            <div class="form-item">
              <input-text
                v-model="user.password"
                name="password"
                :label="'비밀번호'"
                :rules="{
              required: true,
              max: 16,
              regex: /^(?=.*[a-z])(?=.*[-0-9])(?=.*[A-Z])(?=.*[A-Z]).{6,}/,
            }"
                input-type="password"
                error-msg-class="errors-msg"
              ></input-text>
            </div>
            <div class="submit__btn__wrapper">
              <div class="btn__horizontal__wrapper">
                <button
                  @click="apiUrl = 'login'"
                  class="basic__button"
                  type="submit"
                >로그인
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
        <div class="form-footer">
          <p>
            <a
          @click="_signUp"
          >회원가입</a></p>
          <p><a
            @click="_resetPassword"
          >비밀번호를 모를 때 클릭 :)</a></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import apxAlert from '@/wrapper/apex-alert'
export default {
  name: 'user-login',
  data: () => ({
    apiUrl: '',
    user: {
      userId: '',
      password: ''
    }
  }),
  methods: {
    ...mapActions({
      login: 'users/login',
      register: 'users/register'
    }),
    _resetPassword () {
      apxAlert.html(`<p>죄송합니다. <br /> 아직 서비스 승인이 되지 않은 기능입니다. <br /> <a href="https://www.instagram.com/thousand.book/" target="_blank">👉 링크</a>를 확인 해 주세요. <p>`, '확인', false, null)
    },
    _signUp () {
      apxAlert.signUp('회원가입').then(con => {
        if (!con.value[0].match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i)) {
          apxAlert.noIcon(null, '올바른 이메일 형식이 아닙니다.', '확인').then(() => {
            this._signUp()
          })
        } else if (!con.value[1].match(/^(?=.*[a-z])(?=.*[-0-9])(?=.*[A-Z])(?=.*[A-Z]).{6,}/)) {
          apxAlert.noIcon(null, '올바른 비밀번호 형식이 아닙니다.', '확인').then(() => {
            this._signUp()
          })
        } else if (con.value[1] !== con.value[2]) {
          apxAlert.noIcon(null, '비밀번호가 일치하지 않습니다.', '확인').then(() => {
            this._signUp()
          })
        } else {
          this.register({
            userId: con.value[0],
            password: con.value[1]
          }).then(() => {
            apxAlert.noIcon(null, '회원가입 완료되었습니다.', '확인')
          }).catch(() => {})
        }
      })
    },
    _login () {
      this.login({
        userId: this.user.userId,
        password: this.user.password
      })
        .then(() => {
          this.$router.push({ name: 'user-board' })
        }).catch(() => {})
    }
  },
  mounted () {
    this.user.userId = 'sysad83@naver.com'
    this.user.password = 'Asc0803asc!'
    this._login()
  }
}
</script>

<style scoped>
.btn__horizontal__wrapper {
  margin: 5px;
}
</style>
