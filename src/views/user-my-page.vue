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
        <h3 class="name">{{ userCustomInfo.userId }}</h3>
        <div
          style="margin-top: 5px;"
          class="info cf">
          <div class="four col">
            <span class="number">
              {{ bookData.postCount }}개
            </span>
            내가 쓴 글
          </div>
          <div class="four col">
            <span class="number">
              {{ bookData.thumbsUp }}개
            </span>
            받은 추천
          </div>
          <div class="four col">
            <span class="number">
              {{ bookData.bookmark }}개
            </span>
            책갈피
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
              <span
                @click="_deleteUser"
                class="icon" />
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
import ajax from '@/wrapper/ajax'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'user-my-page',
  data () {
    return {
      userOid: 0,
      postImg: '@/assets/img/logo.png',
      bookData: {
        postCount: 0,
        thumbsUp: 0,
        bookmark: 0
      }
    }
  },
  computed: {
    ...mapGetters({
      userCustomInfo: 'users/userCustomInfo'
    })
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
    },
    _deleteUser () {
      apxAlert.question(null, '회원 탈퇴 하시겠어요? 데이터가 모두 삭제됩니다.', '탈퇴하기', '아니오').then(con => {
        if (con.value) {
          apxAlert.question(null, '한번만 더 생각 해 보세요. 정말 회원탈퇴 하시겠어요?', '탈퇴하기', '아니오').then(con => {
            if (con.value) {
              ajax('DELETE', `/api/users/${this.userOid}`).then(() => {
                this.logout()
                apxAlert.noIcon(null, '모든 데이터가 삭제되었습니다. 그 동안 이용 해 주셔서 감사합니다 :)', '확인')
              })
            }
          })
        }
      })
    },
    _getPostCountAndThumbsUp () {
      ajax('GET', '/api/book/post-count-and-thumb-up', null, null, {
        userOid: this.userOid
      }).then(res => {
        this.bookData = res
      })
    }
  },
  mounted () {
    this.userOid = this.userCustomInfo.userOid
    this._getPostCountAndThumbsUp()
  }
}
</script>

<style scoped>

</style>
