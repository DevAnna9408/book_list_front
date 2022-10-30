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
          >비밀번호를 모를 때 & <br /> 계정 잠금 해제시 클릭 :)</a></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ajax from '@/wrapper/ajax'
import { mapActions } from 'vuex'
import apxAlert from '@/wrapper/apex-alert'
export default {
  name: 'user-login',
  data: () => ({
    apiUrl: '',
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
      let userId = ''
      let password = ''
      apxAlert.findPassword('확인').then(con => {
        if (con.value) {
          userId = con.value[0]
          password = con.value[1]
          ajax('GET', '/api/find-password', null, null, {
            userId: userId,
            nickName: password
          }).then(res => {
            apxAlert.answerPassword(res, '확인').then(ans => {
              if (ans.value) {
                ajax('POST', '/api/answer-password', null, null, {
                  userId: userId,
                  nickName: password,
                  answer: ans.value[0].replace(/ /g, '')
                }).then(ansRes => {
                  if (ansRes) {
                    apxAlert.resetPassword('확인').then(pass => {
                      if (!pass.value[0].match(/^(?=.*[a-z])(?=.*[-0-9])(?=.*[A-Z])(?=.*[A-Z]).{6,}/)) {
                        apxAlert.noIcon(null, '올바른 비밀번호 형식이 아닙니다.', '확인').then(() => {
                          this._resetPassword()
                        })
                      } else if (pass.value[0] !== pass.value[1]) {
                        apxAlert.noIcon(null, '비밀번호가 일치하지 않습니다.', '확인').then(() => {
                          this._resetPassword()
                        })
                      } else {
                        ajax('PUT', `/api/change-password/${userId}`, {
                          newPassword: pass.value[0]
                        }).then(() => {
                          apxAlert.noIcon(null, '새로운 비밀번호로 변경되었습니다.', '확인')
                        }).catch(() => {})
                      }
                    })
                  } else {
                    apxAlert.noIcon(null, '본인 확인 질문에 대한 답변이 일치하지 않습니다.', '확인')
                  }
                }).catch(() => {})
              }
            })
          }).catch(() => {})
        }
      })
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
        } else if (con.value[3].trim() === '' || con.value[4].trim() === '') {
          apxAlert.noIcon(null, '본인 확인 질문과 답변을 작성 해 주세요.', '확인').then(() => {
            this._signUp()
          })
        } else {
          this.register({
            userId: con.value[0],
            password: con.value[1],
            question: con.value[3],
            answer: con.value[4]
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
  }
}
</script>

<style scoped>
.btn__horizontal__wrapper {
  margin: 5px;
}
</style>
