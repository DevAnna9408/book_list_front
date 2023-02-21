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
          <form @submit.prevent="passes(_findPassword)">
            <div class="form-item">
              <input-text
                :readonly="userStep.firstAnswer"
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
                :readonly="userStep.firstAnswer"
                v-model="user.nickName"
                name="프로필명"
                :label="'프로필명'"
                input-type="text"
                error-msg-class="errors-msg"
              ></input-text>
              프로필명을 설정한 적이 없다면 <strong>이메일의 @ 앞 부분</strong>을 적어주세요
            </div>
            <div class="submit__btn__wrapper">
              <div class="btn__horizontal__wrapper">
                <button
                  class="basic__button"
                  type="submit"
                >이메일 확인
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
        <ValidationObserver
          v-if="userStep.firstAnswer"
          v-slot="{ invalid, passes }">
          <form @submit.prevent="passes(_answerPassword)">
            <div class="form-item">
              <input-text
                v-model="userQuestion.question"
                name="비밀번호 찾기 질문"
                :label="'비밀번호 찾기 질문'"
                input-type="text"
                readonly="true"
              ></input-text>
            </div>
            <div class="form-item">
              <input-text
                :readonly="userStep.secondAnswer"
                v-model="userQuestion.answer"
                name="답변"
                :label="'답변'"
                input-type="text"
              ></input-text>
            </div>
            <div class="submit__btn__wrapper">
              <div class="btn__horizontal__wrapper">
                <button
                  class="basic__button"
                  type="submit"
                >답변 확인
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
        <ValidationObserver
          v-if="userStep.secondAnswer"
          v-slot="{ invalid, passes }">
          <form @submit.prevent="passes(_changePassword)">
            <div class="form-item">
              <input-text
                v-model="user.password"
                name="새로운 비밀번호"
                :label="'새로운 비밀번호'"
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
                name="비밀번호 확인"
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
            <div class="submit__btn__wrapper">
              <div class="btn__horizontal__wrapper">
                <button
                  class="basic__button"
                  type="submit"
                >비밀번호 변경
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
import { ajaxWithoutLoading } from '@/wrapper/ajax'
export default {
  name: 'user-reset-password',
  data: () => ({
    user: {
      userId: '',
      nickName: '',
      password: '',
      confirmPassword: ''
    },
    userQuestion: {
      question: '',
      answer: ''
    },
    userStep: {
      firstAnswer: false,
      secondAnswer: false
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
    },
    _findPassword () {
      ajaxWithoutLoading('GET', '/api/find-password', null, null, {
        userId: this.user.userId,
        nickName: this.user.nickName
      }).then(_res => {
        if (_res !== '') {
          this.userStep.firstAnswer = true
          this.userQuestion.question = _res
        } else {
          sweetAlert.noIcon(null, '이메일과 프로필명에 해당하는 회원이 존재하지 않습니다.', '확인')
        }
      })
    },
    _answerPassword () {
      ajaxWithoutLoading('POST', '/api/answer-password', null, null, {
        userId: this.user.userId,
        nickName: this.user.nickName,
        answer: this.userQuestion.answer
      }).then(_res => {
        if (_res) this.userStep.secondAnswer = true
        else sweetAlert.noIcon(null, '본인 확인 질문에 대한 답변이 일치하지 않습니다.', '확인')
      })
    },
    _changePassword () {
      if (this.user.password !== this.user.confirmPassword) {
        sweetAlert.noIcon(null, '비밀번호가 일치하지 않습니다.', '확인')
      } else {
        ajaxWithoutLoading('PUT', `/api/change-password/${this.user.userId}`, {
          newPassword: this.user.password
        }).then(() => {
          sweetAlert.noIcon(null, '새로운 비밀번호로 변경되었습니다.', '확인')
          this.$router.push({ name: 'user-login' })
        })
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
