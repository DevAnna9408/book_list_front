<template>
  <div id="user-find-pwd" class="single-small-box bg-grey base-height">
    <div class="container">
      <div class="small-box">
        <div class="page-title-and-information">
          <div class="preset"></div>
          <div class="custom">
            <h2>{{ $t("user.find.pw") }}</h2>
          </div>
        </div>
        <div>
          <div>
            <div method action>
              <ValidationObserver v-slot="{ invalid, passes }">
                <form @submit.prevent="passes(_find)">
                  <div>
                    <div>
                      <div class="input-title">
                        {{$t('attributes.userId')}}
                        <span class="required">{{ $t('user.require') }}</span>
                      </div>
                      <div class="input-group without-label">
                        <input-text
                          v-model="userId"
                          name="userId"
                          label
                          rules="required"
                          input-type="text"
                          error-msg-class="errors-msg"
                        ></input-text>
                      </div>
                      <div class="input-title">
                        {{$t('attributes.find_id_email')}}
                        <span class="required">{{ $t('user.require') }}</span>
                      </div>
                      <div class="input-group without-label">
                        <input-text
                          v-model="email"
                          name="email"
                          label
                          rules="required|email"
                          input-type="text"
                          error-msg-class="errors-msg"
                        ></input-text>
                      </div>
                    </div>
                    <div>
                      <button class="btn gradient-btn" :disabled="invalid">{{ $t("user.find.pw") }}</button>
                    </div>
                    <div v-if="show">
                      <div>
                        <h6>{{ $t("user.id") }}</h6>
                        <input v-model="userId" input-type="text" disabled />
                      </div>
                      <div>
                        <button @click="$router.push({ name: 'user-login' })">{{ $t("user.login") }}</button>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataConfirm from '@/mixins/dataConfirm.js'
import ajax from '@/wrapper/ajax.js'
import apxAlert from '@/wrapper/apex-alert.js'
export default {
  name: 'user-find-pwd',
  components: {},
  mixins: [dataConfirm],
  data () {
    return {
      email: '',
      userId: '',
      show: false
    }
  },
  methods: {
    _find () {
      ajax('GET', '/find/password', null, null, {
        userId: this.userId,
        email: this.email
      }).then(() => {
        apxAlert.success(this.$t('send'), this.$t('check_email'))
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
    "send": "Email Sent",
    "check_email": "Please confirm an email in 30 mins."
  },
  "ko": {
    "send": "이메일이 전송되었습니다.",
    "check_email": "30분 내로 이메일을 확인해주세요."
  }
}
</i18n>
