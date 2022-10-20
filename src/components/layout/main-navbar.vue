<template>
  <div class="header-container admin">
    <div class="nav-brand">
      <router-link :to="{ name: 'user-board' }">
        <!-- FIXME: [프로젝트 초기설정] 로고 변경필요 -->
        <img
          src="@/assets/img/logo@2x.png"
          alt="apexFW"
        >
      </router-link>
    </div>
    <div class="nav-items">
      <ul class="nav-bar-container">
        <router-link to="user-board">
          <li>
            <div>
              책방
            </div>
            <i class="fa-solid fa-house"></i>
          </li>
        </router-link>
        <li>
          <div>
            글쓰기
          </div>
          <i class="fa-solid fa-house"></i>
        </li>
        <li>
          <div>
            팝업
          </div>
          <i class="fa-solid fa-house"></i>
        </li>
        <li>
          <div>
            책갈피
          </div>
          <i class="fa-solid fa-house"></i>
        </li>
        <li>
          <div>
            마이페이지
          </div>
          <i class="fa-solid fa-house"></i>
        </li>
<!--        <li v-if="isUser">-->
<!--          <a @click="_logout()">로그아웃</a>-->
<!--        </li>-->
<!--        <li v-else>-->
<!--          <a @click="$router.push({name: 'user-login'})">로그인</a>-->
<!--        </li>-->
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'main-navbar',
  computed: {
    ...mapGetters({ isUser: 'users/isUser' })
  },
  methods: {
    ...mapMutations({ logout: 'users/LOGOUT' }),
    ...mapActions({}),
    _logout () {
      this.logout()
    }
  }
}
</script>
<style scoped>
</style>
