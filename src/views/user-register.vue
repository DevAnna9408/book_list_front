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
          <form @submit.prevent="passes( _signUp)">
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
            <div class="form-item">
              <input-text
                v-model="user.confirmPassword"
                name="password"
                :label="'비밀번호 확인'"
                :rules="{
              required: true,
              max: 16,
              regex: /^(?=.*[a-z])(?=.*[-0-9])(?=.*[A-Z])(?=.*[A-Z]).{8,}/,
            }"
                input-type="password"
                error-msg-class="errors-msg"
              ></input-text>
            </div>
            <div class="form-item">
              <input-text
                v-model="userQuestion.question"
                name="비밀번호 찾기 질문"
                :label="'비밀번호 찾기 질문'"
                input-type="text"
                error-msg-class="errors-msg"
              ></input-text>
            </div>
            <div class="form-item">
              <input-text
                v-model="userQuestion.answer"
                name="비밀번호 찾기 답변"
                :label="'비밀번호 찾기 답변'"
                input-type="text"
                error-msg-class="errors-msg"
              ></input-text>
            </div>
            <div class="submit__btn__wrapper">
              <div class="btn__horizontal__wrapper">
                <button
                  class="basic__button"
                  type="submit"
                >회원가입
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import sweetAlert from '@/wrapper/sweet-alert'
export default {
  name: 'user-register',
  data: () => ({
    user: {
      userId: '',
      password: '',
      confirmPassword: ''
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
    _signUp () {
      if (this.user.password !== this.user.confirmPassword) {
        sweetAlert.noIcon(null, '비밀번호가 일치하지 않습니다.', '확인')
      } else if (this.userQuestion.question.trim() === '' || this.userQuestion.answer.trim() === '') {
        sweetAlert.noIcon(null, '본인 확인 질문과 답변을 작성 해 주세요.', '확인')
      } else {
        this.register({
          userId: this.user.userId,
          password: this.user.password,
          question: this.userQuestion.question,
          answer: this.userQuestion.answer
        }).then(() => {
          sweetAlert.noIcon(null, '회원가입 완료되었습니다.', '확인')
          this.$router.push({ name: 'user-login' })
        }).catch(() => {})
      }
    }
  }
}
</script>

<style scoped>
.btn__horizontal__wrapper {
  margin: 5px;
}
</style>
