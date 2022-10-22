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
      <ul
        id="nav__icons"
        class="nav-bar-container">
        <router-link :to="{ name: 'user-board' }">
          <li>
            <div style="min-width: 50px;">
              책장
            </div>
            <i class="fa-solid fa-list" />
          </li>
        </router-link>
        <router-link :to="{ name: 'user-post' }">
          <li>
            <div style="min-width: 50px;">
              글쓰기
            </div>
            <i class="fa-solid fa-square-plus" />
          </li>
        </router-link>
          <li
            @click="_getRandomBook"
          >
            <div style="min-width: 50px;">
              책 꺼내기
            </div>
            <i class="fa-solid fa-book" />
          </li>
        <router-link :to="{ name: 'user-bookmark' }">
        <li>
          <div style="min-width: 50px;">
            책갈피
          </div>
          <i class="fa-solid fa-bookmark" />
        </li>
        </router-link>
        <router-link :to="{ name: 'user-my-page' }">
        <li>
          <div style="min-width: 80px;">
            마이페이지
          </div>
          <i class="fa-solid fa-user" />
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
