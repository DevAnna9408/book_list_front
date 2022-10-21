<template>
<div id="user-my-page">
  <div
    style="margin-top: 100px;"
    class="container">
    <div
      style="display: flex; justify-content: center"
      class="row cf">
      <div id="card1" class="card four col">
        <div
          class="image-wrapper"
        >
          <img src="@/assets/img/logo.png" alt="img">
        </div>
        <h3 class="name">userId</h3>
        <h3 class="name">userEmail</h3>
        <div
          style="margin-top: 5px;"
          class="info cf">
          <div class="four col">
            <span class="number">
              100개
            </span>
            내가 쓴 글
          </div>
          <div class="four col">
            <span class="number">
              100개
            </span>
            받은 추천
          </div>
          <div class="four col">
            <span class="number">
              100일
            </span>
            함께한 날
          </div>
        </div>
        <div class="options">
          <ul style="text-align: left">
            <li>
              <span class="icon" />
              공지사항
            </li>
            <li>
              <span class="icon" />
                개발자 연락처
            </li>
            <li>
              <span class="icon" />
              가이드
            </li>
            <li>
              <span
                @click="_logout"
                class="icon" />
              로그아웃
            </li>
            <li>
              <span class="icon" />
              회원탈퇴
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import apxAlert from '@/wrapper/apex-alert'
import { mapMutations } from 'vuex'
export default {
  name: 'user-my-page',
  data () {
    return {
      postImg: '@/assets/img/logo.png'
    }
  },
  methods: {
    ...mapMutations({
      logout: 'users/LOGOUT'
    }),
    _logout () {
      apxAlert.question(null, '로그아웃 할까요?', '로그아웃', '아니오').then(con => {
        if (con.value) {
          this.logout()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
