<template>
  <div
    id="loading-fullsize"
    class="form-loading full-size wait">
    <div class="form-saving">
      <div
        class="loading__wrapper"
      >
        <span>
          <img
            class="loading__logo"
            src="@/assets/img/logo.png"
            alt="logo">
        </span>
        <br />
        <span>
        로고를 클릭!
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'user-load-page',
  computed: {
    ...mapGetters({
      loggedInAccessToken: 'users/loggedInAccessToken',
      loggedInUserRoleType: 'users/loggedInUserRoleType'
    })
  },
  methods: {
    ...mapActions({
      login: 'users/login'
    })
    // isUser (role) {
    //   return Constants.ROLE_TYPE.USER === role
    // },
    // isAdmin (role) {
    //   return Constants.ROLE_TYPE.SYS_ADMIN === role
    // },
    // async _refreshToken () {
    //   if (this.loggedInAccessToken === '') {
    //     await this.$router.push({ name: 'user-login' })
    //   } else {
    //     if (this.isAdmin(this.loggedInUserRoleType[0].code)) await this.$router.push({ name: 'admin-board' })
    //     else await this.$router.push({ name: 'user-board' })
    //   }
    // }
  },
  created () {
    this.login({
      userId: 'sysad83@naver.com',
      password: 'Asc0803asc!'
    })
      .then(() => {
        this.$router.push({ name: 'user-board' })
      })
  }
}
</script>

<style scoped>
</style>
