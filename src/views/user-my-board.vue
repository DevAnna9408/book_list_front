<template>
<div id="user-my-board">
  <div class="component__title__my__board">
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
        <span class="survey-progress-labels">
          <span class="survey-progress-label">
            👍 {{ item.thumbsUp  }}
          </span>
                    <span class="survey-progress-label">
            👎 {{ item.thumbsUp  }}
          </span>
          <span
            @click="_deleteBook(item.bookOid)"
            class="survey-progress-label">
              <i class="fa-solid fa-trash-can"></i>
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
import sweetAlert from '@/wrapper/sweet-alert'
import ajax from '@/wrapper/ajax'
import { mapGetters } from 'vuex'
export default {
  name: 'user-my-board',
  data () {
    return {
      userOid: 0,
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
      bookData: {
        postCount: 0,
        thumbsUp: 0,
        bookmark: 0
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
      ajax('GET', '/api/book/my-list', null, null, {
        userOid: this.userOid,
        sortParam: this.thumbsOrder,
        reverse: this.reverseOrder,
        page: this.searchParam.page,
        size: this.searchParam.size
      }).then(res => {
        this.currentPage = this.searchParam.page + 1
        this.results = res
        this._getBookOidsInBookmark()
      })
    },
    _getBookOidsInBookmark () {
      ajax('GET', '/api/bookmark/book-oids', null, null, {
        userOid: this.userOid
      }).then(res => {
        this.results.content.forEach(c => {
          if (res.includes(c.bookOid)) c.isMarked = true
        })
      })
    },
    _deleteBook (bookOid) {
      sweetAlert.html(`<p>글을 삭제 하시겠어요? <br /> 다른 사람들의 책갈피에서도 글이 사라집니다.<p>`, '삭제', true, '아니오').then(con => {
        if (con.value) {
          ajax('DELETE', '/api/book', null, null, {
            userOid: this.userOid,
            bookOid: bookOid
          }).then(() => {
            sweetAlert.noIcon(null, '글을 삭제했습니다.', '확인')
            this._getBookList()
          })
        }
      })
    },
    _getPostCountAndThumbsUp () {
      ajax('GET', '/api/book/post-count-and-thumb-up', null, null, {
        userOid: this.userOid
      }).then(res => {
        this.bookData = res
        sweetAlert.html(`<p>지금까지 총 ${this.bookData.postCount}개의 포스팅, <br />${this.bookData.thumbsUp}개의 추천을 받았어요 :)<p>`, '확인', false, null)
      })
    }
  },
  mounted () {
    this._getBookList()
  },
  created () {
    this.userOid = this.userCustomInfo.userOid
    this._getPostCountAndThumbsUp()
  }
}
</script>

<style scoped>

</style>
