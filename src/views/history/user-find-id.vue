<template>
  <div id="user-find-id" class="single-small-box bg-grey base-height">
    <div class="container">
      <div class="small-box">
        <div class="page-title-and-information">
          <div class="preset"></div>
          <div class="custom">
            <h2>{{ $t("user.find.id") }}</h2>
          </div>
        </div>
        <div method action>
          <ValidationObserver v-slot="{ invalid, passes }">
            <form @submit.prevent="passes(_find)">
              <div>
                <div>
                  <div>
                    <div class="input-title">
                      {{$t('attributes.find_id_email')}}
                      <span class="required">{{ $t('user.require') }}</span>
                    </div>
                    <div class="input-group without-label">
                      <input-text
                        v-model="email"
                        name="email"
                        label
                        rules="required|email|max:100"
                        input-type="text"
                        :placeholder="$t('user.id_placeholder')"
                        error-msg-class="errors-msg"
                      ></input-text>
                    </div>
                  </div>
                  <div>
                    <button class="btn gradient-btn" :disabled="invalid">{{ $t("user.find.id") }}</button>
                  </div>
                </div>
              </div>
            </form>
          </ValidationObserver>

          <div>
            <div class="user-id-result" v-if="show">
              <span class="find-title">{{$t('attributes.userId')}} : </span><input v-model="userId" type="text" disabled />
            </div>
            <div>
              <div class="row mt-1">
                <div class="col col-6">
                  <button class="btn grey-border" @click="$router.push({ name: 'user-login' })">{{ $t("user.login") }}</button>
                </div>
                <div class="col col-6">
                  <button class="btn grey-border" @click="$router.push({ name: 'user-find-pwd' })">{{ $t("user.find.pw") }}</button>
                </div>
              </div>
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
export default {
  name: 'user-find-id',
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
      ajax('GET', '/find/id', null, null, { email: this.email })
        .then(res => {
          this.show = true
          this.userId = res
        })
        .catch(e => {
          this.show = false
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
