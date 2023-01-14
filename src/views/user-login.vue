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
          <form @submit.prevent="passes( _login)">
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
              regex: /^(?=.*[a-z])(?=.*[-0-9])(?=.*[A-Z])(?=.*[A-Z]).{8,}/,
            }"
                input-type="password"
                error-msg-class="errors-msg"
              ></input-text>
            </div>
            <div class="submit__btn__wrapper">
              <div class="btn__horizontal__wrapper">
                <button
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
          >비밀번호를 모를 때 & <br /> 계정 잠금 해제시 클릭 :)</a></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'user-login',
  data: () => ({
    user: {
      userId: '',
      password: ''
    },
    userQuestion: {
      question: '',
      answer: ''
    }
  }),
  methods: {
    ...mapActions({
      login: 'users/login',
      register: 'users/register'
    }),
    _resetPassword () {
      this.$router.push({ name: 'user-reset-password' })
    },
    _signUp () {
      this.$router.push({ name: 'user-register' })
    },
    _login () {
      this.login({
        userId: this.user.userId,
        password: this.user.password
      })
        .then(() => {
          this.$router.push({ name: 'user-board' })
        }).catch(() => {
          this.$router.push({ name: 'user-login' })
        })
    }
  }
}
</script>

<style scoped>
.btn__horizontal__wrapper {
  margin: 5px;
}
</style>
