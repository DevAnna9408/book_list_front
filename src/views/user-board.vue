<template>
<div id="user-board">
  <ul class="surveys grid">
    <li
      v-for="(item, index) in results.content" :key="index"
      class="survey-item">
    <div @dblclick="_getThumb(item.bookOid)">
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
          <span class="survey-progress-label">
            👍 {{ Math.ceil(item.thumbsUp / 10 * 100) }}%
          </span>

          <span class="survey-completes">
            {{ item.thumbsUp }} / 10
          </span>

          <span
            @click="_bookmark(item.isMarked, item.bookOid)"
            class="survey-progress-label">
              <i
                v-if="item.isMarked"
                style="font-size: 15px;"
                class="fa-solid fa-bookmark" />
            <i
              v-else
              style="font-size: 15px;"
              class="fa-regular fa-bookmark" />
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
  <div class="button__menu__wrapper">
    <button
      v-if="reverseOrder"
      @click="_reverseOrder"
      class="basic__button">
      등록일 👆
    </button>
    <button
      v-else
      @click="_reverseOrder"
      class="basic__button">
      등록일 👇
    </button>
    <button
      v-if="!thumbsOrder"
      @click="_thumbsOrder"
      class="basic__button">
      추천수 👆
    </button>
    <button
      v-else
      @click="_thumbsOrder"
      class="basic__button">
      추천수 👇
    </button>
    <button
      @click="_getBookList"
      class="basic__button">
      검색
    </button>
  </div>
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
import apxAlert from '@/wrapper/apex-alert'
import ajax from '@/wrapper/ajax'
import { mapGetters } from 'vuex'
export default {
  name: 'user-board',
  data () {
    return {
      userOid: 0,
      markedOids: [],
      reverseOrder: true,
      thumbsOrder: false,
      currentPage: 1,
      results: {
        content: [{
          bookOid: 0,
          author: '',
          content: '',
          isMarked: false,
          thumbsDown: 0,
          thumbsUp: 0,
          title: ''
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
    _reverseOrder () {
      this.reverseOrder = !this.reverseOrder
    },
    _thumbsOrder () {
      this.thumbsOrder = !this.thumbsOrder
    },
    _pageInput (page) {
      this.searchParam.page = page - 1
      this._getBookList()
    },
    _getBookList () {
      this._getBookOidsInBookmark()
      ajax('GET', '/api/book/list', null, null, {
        sortParam: this.thumbsOrder,
        reverse: this.reverseOrder,
        page: this.searchParam.page,
        size: this.searchParam.size
      }).then(res => {
        this.currentPage = this.searchParam.page + 1
        this.results = res
        this.results.content.forEach(c => {
          if (this._checkIsMarked(c.bookOid)) c.isMarked = true
        })
      })
    },
    _getBookOidsInBookmark () {
      ajax('GET', '/api/bookmark/book-oids', null, null, {
        userOid: this.userOid
      }).then(res => {
        this.markedOids = res
      })
    },
    _checkIsMarked (bookOid) {
      return this.markedOids.includes(bookOid)
    },
    _bookmark (isMarked, bookOid) {
      if (!isMarked) {
        apxAlert.question(null, '내 책갈피에 저장할까요?', '네', '아니오').then(con => {
          if (con.value) {
            ajax('POST', '/api/bookmark', null, null, {
              userOid: this.userOid,
              bookOid: bookOid
            }).then(() => {
              apxAlert.noIcon(null, '내 책갈피에 저장되었습니다.', '확인')
              this._getBookList()
            }).catch(() => {})
          }
        })
      }
    },
    _getThumb (bookOid) {
      apxAlert.radio('이 글에 대한 느낌은?', {
        false: '비추천 👎',
        true: '추천 👍'
      }).then(con => {
        if (con.value === 'true') {
          ajax('PUT', '/api/book/thumbs-up', null, null, {
            userOid: this.userOid,
            bookOid: bookOid
          }).then(() => {
            apxAlert.noIcon(null, '감사합니다 :)', '확인')
          }).catch(() => {})
        } else if (con.value === 'false') {
          ajax('PUT', '/api/book/thumbs-down', null, null, {
            userOid: this.userOid,
            bookOid: bookOid
          }).then(() => {
            apxAlert.noIcon(null, '감사합니다 :)', '확인')
          }).catch(() => {}).finally(() => {
            this._getBookList()
          })
        }
      })
    }
  },
  async mounted () {
    this.userOid = this.userCustomInfo.userOid
    await this._getBookOidsInBookmark()
    await this._getBookList()
  }
}
</script>

<style scoped>

</style>
