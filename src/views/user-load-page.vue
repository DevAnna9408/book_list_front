<template>
  <div
    id="loading-fullsize"
    class="form-loading full-size wait">
    <div class="form-saving">
      <div
        class="loading__wrapper"
      >
        <span
          @click="_refreshToken"
        >
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
import { mapGetters, mapMutations } from 'vuex'
import Constants from '@/Constants'

export default {
  name: 'user-load-page',
  computed: {
    ...mapGetters({
      loggedInAccessToken: 'users/loggedInAccessToken',
      loggedInUserRoleType: 'users/loggedInUserRoleType'
    })
  },
  methods: {
    ...mapMutations({
      logout: 'users/LOGOUT'
    }),
    isUser (role) {
      return Constants.ROLE_TYPE.USER === role
    },
    isAdmin (role) {
      return Constants.ROLE_TYPE.SYS_ADMIN === role
    },
    async _refreshToken () {
      if (this.loggedInAccessToken === '') {
        await this.logout()
      } else {
        if (this.isAdmin(this.loggedInUserRoleType[0].code)) await this.$router.push({ name: 'admin-board' })
        else await this.$router.push({ name: 'user-board' })
      }
    }
  }
}
</script>

<style scoped>
</style>
