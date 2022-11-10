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
import { mapGetters } from 'vuex'

export default {
  name: 'user-load-page',
  computed: {
    ...mapGetters({
      loggedInAccessToken: 'users/loggedInAccessToken'
    })
  },
  methods: {
    _refreshToken () {
      if (this.loggedInAccessToken === '') {
        this.$router.push({ name: 'user-login' })
      } else {
        this.$router.push({ name: 'user-board' })
      }
    }
  }
}
</script>

<style scoped>
</style>
