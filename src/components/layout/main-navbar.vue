<template>
  <div class="header-container admin">
    <div class="nav-brand">
      <router-link :to="{ name: 'user-board' }">
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
import sweetAlert from '@/wrapper/sweet-alert'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ajax from '@/wrapper/ajax'
export default {
  name: 'main-navbar',
  data () {
    return {
      userOid: 0
    }
  },
  computed: {
    ...mapGetters({ isUser: 'users/isUser', userCustomInfo: 'users/userCustomInfo' })
  },
  methods: {
    ...mapMutations({ logout: 'users/LOGOUT' }),
    ...mapActions({}),
    _logout () {
      this.logout()
    },
    _getRandomBook () {
      ajax('GET', '/api/book/random', null, null, {
        userOid: this.userOid
      }).then(res => {
        sweetAlert.html('<p style="font-size: 11px; color: #A1A1A4;">' +
          res.content + '</p> <br /> <p style="font-size: 11px; color: #A1A1A4;">' +
          res.author + '_' + res.title + '</p>',
        '책갈피로', true, '닫기').then(con => {
          if (con.value) {
            ajax('POST', '/api/bookmark', null, null, {
              userOid: this.userOid,
              bookOid: res.bookOid
            }).then(() => {
              sweetAlert.noIcon(null, '내 책갈피에 저장되었습니다.', '확인')
            }).catch(() => {})
          }
        })
      }).catch(() => {})
    }
  },
  created () {
    this.userOid = this.userCustomInfo.userOid
  }
}
</script>
<style scoped>
</style>
