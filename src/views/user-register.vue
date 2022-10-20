<template>
  <div id="user-register" class="single-small-box bg-grey base-height">
    <div class="container">
      <div class="small-box">
        <h2>{{$t('user.register')}}</h2>

        <ValidationObserver v-slot="{ invalid, passes }">
          <form @submit.prevent="passes(_register)">
            <div class="form-elements">
              <div class="row">
                <div class="col col-6">
                  <div class="input-title">
                    {{ $t('attributes.userId') }}
                    <span class="required">{{ $t('user.require') }}</span>
                  </div>
                  <div class="registration-input">
                    <input-text
                      v-model="user.userId"
                      name="userId"
                     :rules="{ required: true, max: 20, regex: /^[a-z0-9+]{5,20}$/ }"
                      input-type="text"
                      :inputFocus.sync="userId"
                      error-msg-class="errors-msg"
                    ></input-text>
                    <h6 class="error-if-exist" v-if="!userId.isUse">{{ $t("user.using_id") }}</h6>
                  </div>
                </div>
                <div class="col col-6">
                  <div class="input-title">
                    {{ $t('attributes.email') }}
                    <span class="required">{{ $t('user.require') }}</span>
                  </div>
                  <div class="registration-input">
                    <input-text
                      v-model="user.email"
                      name="email"
                      rules="required|email|max:100"
                      input-type="text"
                      :input-focus.sync="email"
                      error-msg-class="errors-msg"
                    />
                    <h6 class="error-if-exist" v-if="!email.isUse">{{ $t("user.using_email") }}</h6>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col col-6">
                  <div class="input-title">
                    {{ $t('attributes.password') }}
                    <span class="required">{{ $t('user.require') }}</span>
                  </div>
                  <input-text
                    vid="password"
                    v-model="user.password"
                    name="password"
                    label
                    error-msg-class="errors-msg pre-line"
                    :rules="{ required: true, max: 16, regex: /(?=.*\d{1,})(?=.*[~`!@#$%\^&*()-+=]{1,})(?=.*[a-z]{1,})(?=.*[A-Z]{1,}).{8,16}$/ }"
                    input-type="password"
                  ></input-text>
                </div>
                <div class="col col-6">
                  <div class="input-title">
                    {{ $t('attributes.password_confirmation') }}
                    <span class="required">{{ $t('user.require') }}</span>
                  </div>
                  <input-text
                    v-model="passwordConfirm"
                    name="password_confirmation"
                    label
                    error-msg-class="errors-msg pre-line"
                    rules="required|confirmed:password"
                    input-type="password"
                  ></input-text>
                </div>
              </div>
              <div class="row btn-set">
                <div class="col col-12">
                  <button class="btn gradient-btn" :disabled="invalid">{{ $t("user.enrollment") }}</button>
                </div>
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
import dataConfirm from '@/mixins/dataConfirm.js'
import ajax from '@/wrapper/ajax.js'

export default {
  name: 'user-register',
  components: {},
  mixins: [dataConfirm],
  data () {
    return {
      role: ['ROLE_USER'],
      user: {
        userId: '',
        email: '',
        password: '',
        roles: []
      },
      passwordConfirm: '',
      userId: {
        focused: false,
        isUse: true
      },
      email: {
        focused: false,
        isUse: true
      }
    }
  },
  computed: {
    ...mapGetters({})
  },
  watch: {
    // FIXME: [프레임워크 수정] API 에서 중복체크 추가되면 수정필요
    // async 'userId.focused' (newVal) {
    //   if (!newVal && this.user.userId !== '') {
    //     this.userId.isUse = await this._checkDuplicate(
    //       'userId',
    //       this.user.userId
    //     )
    //   } else if (newVal) {
    //     this.userId.isUse = true
    //   }
    // },
    // async 'email.focused' (newVal) {
    //   if (!newVal && this.user.email !== '') {
    //     this.email.isUse = await this._checkDuplicate('email', this.user.email)
    //   } else if (newVal) {
    //     this.email.isUse = true
    //   }
    // }
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({ user_register: 'users/register' }),
    _register () {
      this.user.roles = this.role
      this.user_register(this.user)
        .then(() => {
          this.isSaveData = true
          this.$router.push({ name: 'user-board' })
        })
        .catch(_err => {})
    },
    // FIXME: [프레임워크 수정] API 에서 중복체크 추가되면 수정필요
    _checkDuplicate (type, id) {
      return new Promise((resolve, reject) => {
        ajax('GET', '/register/check', null, null, { type: type, id: id }).then(
          _data => {
            resolve(_data)
          }
        )
      })
    }
  }
}
</script>
<i18n>
{
  "en": {
    "registerLabel" :"Enter your user information"
  },
  "ko": {
    "registerLabel" :"회원 정보 입력"
  }
}
</i18n>
<style>
</style>
<style scoped>
</style>
<style lang="scss">
</style>
