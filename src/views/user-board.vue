<template>
<div id="user-board">
  <div class="component__title">
    {{ $route.meta.title }}
  </div>
  <ul class="surveys grid">
    <li
      v-for="(item, index) in results.content" :key="index"
      class="survey-item">
    <div>
       <div id="user__board__content"
          class="survey-country grid-only">
         <p v-html="item.content" />
       </div>

  <div class="pull-right">
          <span class="survey-progress">
            <span class="survey-progress-bg">
              <span
                class="survey-progress-fg"
                :style="{ width: item.thumbsUp / 10 * 100 + '%' }" />
          </span>

        <span class="survey-progress-labels">
          <span
            @click="_getThumb(item)"
            class="survey-progress-label">
            👍 {{ Math.ceil(item.thumbsUp / 10 * 100) }}%
          </span>

          <span
            class="survey-completes">
            {{ item.thumbsUp }} / 10
          </span>

          <span
            class="survey-progress-label">
              <i
                @click="_deleteBookMark(item.bookOid)"
                v-if="item.isMarked"
                style="font-size: 15px;"
                class="fa-solid fa-bookmark" />
            <i
              @click="_bookmark(item.isMarked, item.bookOid)"
              v-else
              style="font-size: 15px;"
              class="fa-regular fa-bookmark" />
          </span>
          <span
            @click="_sirenUser(item)"
            style="color: #8DC63F; font-size: 14px;">
            <i class="fa-solid fa-ban"></i>
          </span>
        </span>
      </span>
  </div>
  <div
    style="text-align: right"
    class="survey-end-date-wrapper">
      <span class="survey-end-date">
         {{ item.author }}의
      </span>
    <br />
    <span
      class="survey-end-date">
        {{ item.title }}
       </span>
    <br />
    <span
      class="survey-end-date">
        중에서
      </span>
  </div>
</div>

    </li>
  </ul>
  <pagination
    id="pagination"
    v-model="currentPage"
    with-text
    :per-page="results.size"
    :page-count="results.totalPages"
    @input="_pageInput"
  ></pagination>
</div>
</template>

<script>
import sweetAlert from '@/wrapper/sweet-alert'
import { ajax, ajaxWithoutLoading } from '@/wrapper/ajax'
import { mapGetters } from 'vuex'
export default {
  name: 'user-board',
  data () {
    return {
      userOid: 0,
      currentPage: 1,
      results: {
        content: [{
          bookOid: 0,
          author: '',
          content: '',
          isMarked: false,
          thumbsDown: 0,
          thumbsUp: 0,
          title: '',
          postUserOid: 0
        }],
        number: 1,
        totalPages: 10
      },
      searchParam: {
        page: 0,
        size: 10
      }
    }
  },
  computed: {
    ...mapGetters({
      userCustomInfo: 'users/userCustomInfo'
    })
  },
  methods: {
    _sirenUser (data) {
      sweetAlert.question(null, '이 책과 작성자를 신고하시겠습니까?', '네', '아니오').then(con => {
        if (con.value) {
          sweetAlert.input('신고 사유를 작성 해 주세요', '신고하기').then(con => {
            if (con.value) {
              ajaxWithoutLoading('POST', '/api/siren', {
                sirenUserOid: this.userOid,
                sirenedUserOid: data.postUserOid,
                sirenedBookOid: data.bookOid,
                reason: con.value
              }).then(() => {
                sweetAlert.html('<p style="font-size: 15px;">신고가 완료되었습니다 :) <br /><br /> 무분별한 신고로 확인되면 <br />계정이 제재될 수 있으니 주의 해 주세요.<p>', '확인', false, null)
              })
            }
          })
        }
      })
    },
    _pageInput (page) {
      this.searchParam.page = page - 1
      this._getBookListReversed()
    },
    _getBookListReversed () {
      ajax('GET', '/api/book/list/reverse', null, null, {
        userOid: this.userOid,
        page: this.searchParam.page,
        size: this.searchParam.size
      }).then(res => {
        this.currentPage = this.searchParam.page + 1
        this.results = res
        this._getBookOidsInBookmark()
      })
    },
    _getBookOidsInBookmark () {
      ajaxWithoutLoading('GET', '/api/bookmark/book-oids', null, null, {
        userOid: this.userOid
      }).then(res => {
        this.results.content.forEach(c => {
          if (res.includes(c.bookOid)) c.isMarked = true
        })
      })
    },
    _bookmark (isMarked, bookOid) {
      ajaxWithoutLoading('POST', '/api/bookmark', null, null, {
        userOid: this.userOid,
        bookOid: bookOid
      }).then(() => {
        sweetAlert.noIcon(null, '내 책갈피에 저장되었습니다.', '확인')
        this._getBookOidsInBookmark()
      }).catch(() => {})
    },
    _deleteBookMark (bookOid) {
      ajaxWithoutLoading('DELETE', '/api/bookmark', null, null, {
        userOid: this.userOid,
        bookOid: bookOid
      }).then(() => {
        sweetAlert.noIcon(null, '책갈피에서 삭제했습니다.', '확인')
        this._getBookOidsInBookmark()
      })
    },
    _getThumb (data) {
      sweetAlert.radio('이 글에 대한 느낌은?', {
        false: '비추천 👎',
        true: '추천 👍'
      }, '확인').then(con => {
        if (con.value === 'true') {
          ajaxWithoutLoading('PUT', '/api/book/thumbs-up', null, null, {
            userOid: this.userOid,
            bookOid: data.bookOid
          }).then(_res => {
            this.results.content.find(it => it.bookOid === data.bookOid).thumbsUp = _res.thumbsUp
            sweetAlert.noIcon(null, '글을 추천했습니다. 감사합니다 :)', '확인')
          }).catch(() => {})
        } else if (con.value === 'false') {
          ajaxWithoutLoading('PUT', '/api/book/thumbs-down', null, null, {
            userOid: this.userOid,
            bookOid: data.bookOid
          }).then(_res => {
            this.results.content.find(it => it.bookOid === data.bookOid).thumbsDown = _res.thumbsDown
            sweetAlert.noIcon(null, '글을 비추천 했습니다. 감사합니다 :)', '확인')
          }).catch(() => {})
        }
      })
    }
  },
  mounted () {
    this.userOid = this.userCustomInfo.userOid
    this._getBookListReversed()
  }
}
</script>

<style scoped>

</style>
