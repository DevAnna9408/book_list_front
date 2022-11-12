<template>
<div id="user-post">
  <div class="component__title">
    {{ $route.meta.title }}
  </div>
  <ul class="surveys grid">
    <li class="survey-item">
      <span class="survey-country grid-only">
              <div class="user__post__content">
                <input-text-area
                  :maxlength="'200'"
                  v-model="userBookIn.content"
                  :placeholder="'내 마음에 와닿은,\n\n다른 사람과 공유하고 싶은\n\n글귀를 적어 주세요 :)'"
                />
              </div>
      </span>
      <div class="survey-end-date-wrapper">
        <span class="survey-end-date">
          <input-text
            class="user_add_post__title__input"
            :maxlength="50"
            :placeholder="'작가 혹은 가수'"
            v-model="userBookIn.author"
            />
          <input-text
            class="user_add_post__title__input"
            :maxlength="50"
            :placeholder="'제목 혹은 곡명'"
            v-model="userBookIn.title"
          />
      </span>
      </div>
      <div
      class="button__wrapper"
      >
        <button
          class="basic__button"
          @click="_createBook"
        >
          작성
        </button>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
import sweetAlert from '@/wrapper/sweet-alert'
import ajax from '@/wrapper/ajax'
import { mapGetters } from 'vuex'
export default {
  name: 'user-post',
  data () {
    return {
      userBookIn: {
        content: '',
        author: '',
        title: '',
        userOid: 0
      }
    }
  },
  computed: {
    ...mapGetters({
      userCustomInfo: 'users/userCustomInfo'
    })
  },
  methods: {
    _createBook () {
      if (this.userBookIn.content === '') {
        sweetAlert.noIcon(null, '내용을 입력 해 주세요', '확인')
      } else if (this.userBookIn.author === '') {
        sweetAlert.noIcon(null, '작가 혹은 가수명을 입력 해 주세요', '확인')
      } else if (this.userBookIn.title === '제목 혹은 곡명을 입력 해 주세요') {
        sweetAlert.noIcon(null, '', '확인')
      } else {
        sweetAlert.html(`<p>글을 작성 할까요? <br /> <br /> 글은 수정할 수 없고 삭제만 가능하니 <br /> 꼼꼼히 확인 해 주세요 :)<p>`, '작성하기', true, '검토하기').then(con => {
          if (con.value) {
            ajax('POST', '/api/book', {
              content: this.userBookIn.content.replaceAll('\n', '<br />'),
              author: this.userBookIn.author,
              title: this.userBookIn.title,
              userOid: this.userBookIn.userOid
            }).then(() => {
              this.userBookIn = {
                content: '',
                author: '',
                title: '',
                userOid: this.userCustomInfo.userOid
              }
              sweetAlert.noIcon(null, '글 작성이 완료되었습니다 :)', '확인')
            }).catch(err => {
              sweetAlert.noIcon(null, err.message, '확인')
            })
          }
        })
      }
    }
  },
  mounted () {
    this.userBookIn.userOid = this.userCustomInfo.userOid
    ajax('GET', '/api/book/check', null, null, {
      userOid: this.userBookIn.userOid
    }).then(() => {}).catch(() => {})
  }
}
</script>

<style scoped>

</style>
