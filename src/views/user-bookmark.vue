<template>
<div id="user-bookmark">
  <div class="component__title">
    {{ $route.meta.title }}
  </div>
  <ul class="surveys grid">
    <li
      @dblclick="_deleteBookmark(item.bookOid)"
      v-for="(item, index) in results.content" :key="index"
      class="survey-item">

      <div
        id="user__bookmark__content"
        class="survey-country grid-only">
        <p v-html="item.content"></p>
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
<!--      <span class="survey-completes">-->
<!--        👍 {{ item.thumbsUp }} / 👎 {{ item.thumbsDown }}-->
<!--      </span>-->
    </li>
  </ul>
  <div class="button__menu__wrapper">
    <button
      v-if="!isWritten"
      @click="_reverseWritten"
      class="basic__button">
      전체
    </button>
    <button
      v-else
      @click="_reverseWritten"
      class="basic__button">
      내가 쓴 글
    </button>
      <button
        @click="_getBookmarkList"
        class="basic__button">
        검색
      </button>
  </div>
  <pagination
    id="pagination"
    v-model="currentPage"
    with-text
    :per-page="results.number"
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
  name: 'user-bookmark',
  data () {
    return {
      isWritten: false,
      userOid: 0,
      currentPage: 1,
      results: {
        content: [{
          author: '',
          bookOid: 0,
          content: '',
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
    _reverseWritten () {
      this.isWritten = !this.isWritten
    },
    _deleteBookmark (bookOid) {
      apxAlert.question(null, '책갈피에서 해제할까요?', '해제한다', '아니오').then(con => {
        if (con.value) {
          ajax('DELETE', '/api/bookmark', null, null, {
            userOid: this.userOid,
            bookOid: bookOid
          }).then(() => {
            apxAlert.noIcon(null, '책갈피에서 삭제했습니다.', '확인')
            this._getBookmarkList()
          })
        }
      })
    },
    _pageInput (page) {
      this.searchParam.page = page - 1
      this._getBookmarkList()
    },
    _getBookmarkList () {
      ajax('GET', '/api/bookmark', null, null, {
        userOid: this.userOid,
        isWritten: this.isWritten,
        page: this.searchParam.page,
        size: this.searchParam.size
      }).then(res => {
        this.currentPage = this.searchParam.page + 1
        this.results = res
      })
    }
  },
  mounted () {
    this.userOid = this.userCustomInfo.userOid
    this._getBookmarkList()
  }
}
</script>

<style scoped>

</style>
