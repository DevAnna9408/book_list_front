<template>
<div id="user-my-page">
  <div class="component__title">
    {{ $route.meta.title }}
  </div>
  <div
    style="margin-top: 15px;"
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
        <h3 class="name">
          {{ nickName }}
          <i
            @click="_editNickName"
            class="fa-solid fa-pen-to-square"></i>
        </h3>
        <div class="options">
          <ul style="text-align: left">
            <li>
              <span
                class="icon"
                @click="$router.push({ name: 'user-my-board' })"
              />
              내가 쓴 글
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
import sweetAlert from '@/wrapper/sweet-alert'
import { ajaxWithoutLoading } from '@/wrapper/ajax'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'user-my-page',
  data () {
    return {
      userOid: 0,
      nickName: ''
    }
  },
  computed: {
    ...mapGetters({
      userCustomInfo: 'users/userCustomInfo'
    })
  },
  methods: {
    ...mapMutations({
      logout: 'users/LOGOUT',
      setUserCustomInfo: 'users/SET_USER_CUSTOM_INFO'
    }),
    _logout () {
      sweetAlert.question(null, '로그아웃 할까요?', '로그아웃', '아니오').then(con => {
        if (con.value) {
          this.logout()
        }
      })
    },
    _openNotice () {
      window.open('https://www.instagram.com/thousand.book/')
    },
    _editNickName () {
      sweetAlert.input('프로필명을 입력 해 주세요', '변경하기').then(con => {
        if (con.value) {
          ajaxWithoutLoading('PATCH', `/api/users/nick-name`, null, null, {
            userOid: this.userOid,
            nickName: con.value
          }).then(res => {
            sweetAlert.noIcon(null, '닉네임이 변경되었습니다.', '확인')
            this.setUserCustomInfo(res)
            this.nickName = con.value
          })
        }
      })
    },
    _deleteUser () {
      sweetAlert.question(null, '회원 탈퇴 하시겠어요? 데이터가 모두 삭제됩니다.', '탈퇴하기', '아니오').then(con => {
        if (con.value) {
          sweetAlert.question(null, '한번만 더 생각 해 보세요. 정말 회원탈퇴 하시겠어요?', '탈퇴하기', '아니오').then(con => {
            if (con.value) {
              ajaxWithoutLoading('DELETE', `/api/users`, null, null, {
                userOid: this.userOid
              }).then(() => {
                this.logout()
                sweetAlert.noIcon(null, '모든 데이터가 삭제되었습니다. 그 동안 이용 해 주셔서 감사합니다 :)', '확인')
              })
            }
          })
        }
      })
    }
  },
  mounted () {
    this.userOid = this.userCustomInfo.userOid
    this.nickName = this.userCustomInfo.nickName
  }
}
</script>

<style scoped>

</style>
