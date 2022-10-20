<template>
  <div class="header-container admin">
    <div class="nav-brand">
      <router-link :to="{ name: 'user-board' }">
        <!-- FIXME: [프로젝트 초기설정] 로고 변경필요 -->
        <img
          src="@/assets/img/logo.png"
          alt="logo"
        >
      </router-link>
    </div>
    <div class="nav-items">
      <ul class="nav-bar-container">
        <router-link :to="{ name: 'user-board' }">
          <li>
            <div>
              책방
            </div>
            <i class="fa-solid fa-house" />
          </li>
        </router-link>
        <router-link :to="{ name: 'user-post' }">
          <li>
            <div>
              글쓰기
            </div>
            <i class="fa-solid fa-house" />
          </li>
        </router-link>
          <li
            @click="_getRandomBook"
          >
            <div>
              팝업
            </div>
            <i class="fa-solid fa-house" />
          </li>
        <router-link :to="{ name: 'user-bookmark' }">
        <li>
          <div>
            책갈피
          </div>
          <i class="fa-solid fa-house" />
        </li>
        </router-link>
        <router-link :to="{ name: 'user-my-page' }">
        <li>
          <div>
            마이페이지
          </div>
          <i class="fa-solid fa-house" />
        </li>
        </router-link>
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
import apxAlert from '@/wrapper/apex-alert'
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
    },
    _getRandomBook () {
      apxAlert.noIcon()
    }
  }
}
</script>
<style scoped>
</style>
