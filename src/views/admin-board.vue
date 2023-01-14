<template>
<div id="user-board">
  <div class="component__title">
    {{ $route.meta.title }}
  </div>
  <ul class="surveys grid">
    <li
      v-for="(item, index) in results.content" :key="index"
      class="survey-item">
    <div @dblclick="_getThumb(item.postUserOid, item.bookOid)">
       <div id="user__board__content"
          class="survey-country grid-only">
         <p v-html="item.content" />
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
      @click="_getBookListReversed"
      class="basic__button">
      최신순
    </button>
    <button
      @click="_getBookList"
      class="basic__button">
      오래된 순
    </button>
  </div>
  <div class="button__menu__wrapper">
    <button
      @click="_getBookListByThumbsUp"
      class="basic__button">
      추천높은순
    </button>
    <button
      @click="_getBookListByThumbsDown"
      class="basic__button">
      추천낮은순
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
  name: 'admin-board',
  data () {
    return {
      userOid: 0,
      reverseOrder: true,
      thumbsOrder: true,
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
        size: 20
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
    _getBookList () {
      ajax('GET', '/api/book/list', null, null, {
        userOid: this.userOid,
        page: this.searchParam.page,
        size: this.searchParam.size
      }).then(res => {
        this.currentPage = this.searchParam.page + 1
        this.results = res
        this._getBookOidsInBookmark()
      })
    },
    _getBookListByThumbsUp () {
      ajax('GET', '/api/book/list/by-thumbs-up', null, null, {
        userOid: this.userOid,
        page: this.searchParam.page,
        size: this.searchParam.size
      }).then(res => {
        this.currentPage = this.searchParam.page + 1
        this.results = res
        this._getBookOidsInBookmark()
      })
    },
    _getBookListByThumbsDown () {
      ajax('GET', '/api/book/list/by-thumbs-down', null, null, {
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
      ajax('GET', '/api/bookmark/book-oids', null, null, {
        userOid: this.userOid
      }).then(res => {
        this.results.content.forEach(c => {
          if (res.includes(c.bookOid)) c.isMarked = true
        })
      })
    },
    _getThumb (userOid, bookOid) {
      sweetAlert.radio('[관리자] 어떻게 처리하시겠습니까?', {
        false: '회원제재',
        true: '글삭제'
      }, '확인').then(con => {
        if (con.value === 'true') {
          ajax('DELETE', '/api/admin/book', null, null, {
            userOid: userOid,
            bookOid: bookOid
          }).then(() => {
            sweetAlert.noIcon(null, '글이 삭제되었습니다.', '확인')
          }).catch(() => {}).finally(() => {
            this._getBookList()
          })
        } else if (con.value === 'false') {
          ajax('DELETE', '/api/admin/user', null, null, {
            userOid: userOid
          }).then(() => {
            sweetAlert.noIcon(null, '회원이 제재 처리 되었습니다.', '확인')
          }).catch(() => {}).finally(() => {
            this._getBookList()
          })
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
