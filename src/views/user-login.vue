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
          <form @submit.prevent="passes(_signApi)">
            <div class="form-item">
              <input-text
                v-model="user.email"
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
                <button
                  @click="apiUrl = 'signUp'"
                  class="basic__button"
                  type="submit"
                >회원가입
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
        <div class="form-footer">
          <p><a>비밀번호를 모를 때 클릭 :)</a></p>
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
      email: '',
      password: ''
    }
  }),
  methods: {
    ...mapActions({
      login: 'users/login',
      register: 'users/register'
    }),
    _signApi () {
      if (this.apiUrl === 'login') this._login()
      else this._signUp()
    },
    _signUp () {
      apxAlert.password('비밀번호를 한번 더 입력 해 주세요', '회원가입').then(con => {
        if (con.value) {
          if (con.value === this.user.password) {
            this.register({
              userEmail: this.user.email,
              password: this.user.password
            })
              .then(() => {
                apxAlert.question(null, '회원가입 완료되었습니다. 지금 바로 차곡차곡을 사용 해 볼까요?', '네', '나중에').then(con => {
                  if (con.value) {
                    this._login()
                    window.location.reload(true)
                  }
                })
              }).catch(() => {})
          } else {
            apxAlert.noIcon(null, '비밀번호가 일치하지 않습니다. 다시 한번 입력 해 주세요.', '확인').then(() => {
              this._signUp()
            })
          }
        }
      })
    },
    _login () {
      this.login({
        userEmail: this.user.email,
        password: this.user.password
      })
        .then(() => {
          this.$router.push({ name: 'user-main' })
        }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.btn__horizontal__wrapper {
  margin: 5px;
}
</style>
