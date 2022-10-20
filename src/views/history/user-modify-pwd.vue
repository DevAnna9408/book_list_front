<template>
  <div id="user-modify-pwd" class="single-small-box bg-grey base-height">
    <div class="container">
      <div class="small-box">
        <div class="page-title-and-information">
          <div class="preset"></div>
          <div class="custom">
            <h2>{{ $t("user.change_password") }}</h2>
          </div>
        </div>
        <div method action>
          <ValidationObserver v-slot="{ invalid, passes }">
            <form @submit.prevent="passes(_change)">
              <div>
                <div class="input-title">{{$t('attributes.userId')}}</div>
                <div class="input-group without-label">
                  <input-text v-model="userId" name="userId" label readonly></input-text>
                </div>
              </div>
              <div>
                <div class="input-title">{{$t('attributes.password')}}</div>
                <div class="input-group without-label">
                  <input-text
                    vid="password"
                    v-model="newPassword"
                    name="password"
                    label
                    :rules="{ required: true, max: 16, regex: /(?=.*\d{1,})(?=.*[~`!@#$%\^&*()-+=]{1,})(?=.*[a-z]{1,})(?=.*[A-Z]{1,}).{8,16}$/ }"
                    input-type="password"
                    ref="password"
                    :placeholder="$t('user.pw_placeholder_change')"
                  ></input-text>
                </div>
              </div>
              <div>
                <div class="input-title">{{$t('attributes.password_confirmation')}}</div>
                <div class="input-group without-label">
                  <input-text
                    v-model="passwordConfirm"
                    name="password_confirmation"
                    label
                    rules="required|confirmed:password"
                    input-type="password"
                  ></input-text>
                </div>
              </div>
              <div>
                <button
                  class="btn gradient-btn"
                  :disabled="invalid"
                >{{ $t("user.change_password") }}</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataConfirm from '@/mixins/dataConfirm.js'
import ajax from '@/wrapper/ajax.js'
import dateUtil from '@/utils/date'
import apxAlert from '@/wrapper/apex-alert.js'
export default {
  name: 'user-modify-pwd',
  components: {},
  mixins: [dataConfirm],
  data () {
    return {
      userId: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  methods: {
    _checkHash () {
      ajax('GET', '/find/check/hash', null, null, {
        userId: this.userId,
        hash: this.$route.params.hash
      }).then(res => {
        if (!res) {
          apxAlert.error(this.$t('change_password'), this.$t('fail'))
          this.$router.push({ name: 'user-login' })
        }
      })
    },
    _change () {
      ajax('POST', '/find/change/password', {
        userId: this.userId,
        password: this.newPassword
      }).then(() => {
        apxAlert.success(this.$t('change_password'), this.$t('success'))
        this.$router.push({ name: 'user-login' })
      })
    }
  },
  created () {
    if (this.$route.params.expireDate > dateUtil.getNowDateTime()) {
      this.userId = this.$route.params.userId
      this._checkHash()
    } else {
      apxAlert
        .error(this.$t('change_password'), this.$t('timeover'))
        .then(res => {
          this.$router.push({ name: 'user-login' })
        })
    }
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
    "change_password": "Change Password",
    "success": "Your password has been changed successfully.",
    "fail": "Authentication failed.",
    "timeover": "Valid timed out."
  },
  "ko": {
    "change_password": "비밀번호 변경",
    "success": "성공했습니다.",
    "fail": "인증에 실패했습니다.",
    "timeover": "유효한 시간을 초과했습니다."
  }
}
</i18n>
