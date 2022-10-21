<template>
<div id="user-board">
  <ul class="surveys grid">
    <li
      v-for="(item, index) in results.content" :key="index"
      class="survey-item">
      <div class="justify__right">
        <input-checkbox
          @input="_bookmark"
          v-model="item.isMarked"
        />
      </div>
    <div @dblclick="_getThumb">
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
            👍 {{ item.thumbsUp / 10 * 100 }}%
          </span>

          <span class="survey-completes">
            {{ item.thumbsUp }} / 10
          </span>

          <!--          <span class="survey-completes">-->
          <!--            <i class="fa-solid fa-house" /> / <i class="fa-solid fa-house" />-->
          <!--          </span>-->

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
    :per-page="results.number"
    :page-count="results.totalPages"
    @input="_pageInput"
  ></pagination>
</div>
</template>

<script>
import apxAlert from '@/wrapper/apex-alert'
import InputCheckbox from '@/components/global/input-checkbox'
import ajax from '@/wrapper/ajax'
export default {
  name: 'user-board',
  components: { InputCheckbox },
  data () {
    return {
      reverseOrder: false,
      thumbsOrder: false,
      currentPage: 1,
      results: {
        content: [{
          author: '',
          content: '',
          isMarked: true,
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
  methods: {
    _reverseOrder () {
      this.reverseOrder = !this.reverseOrder
    },
    _thumbsOrder () {
      this.thumbsOrder = !this.thumbsOrder
    },
    _pageInput (page) {
      this.searchParam.page = page - 1
    },
    _getBookList () {
      ajax('GET', '/api/book/list', null, null, {
        sortParam: this.thumbsOrder,
        reverse: this.reverseOrder,
        page: this.searchParam.page,
        size: this.searchParam.size
      }).then(res => {
        this.currentPage = this.searchParam.page - 1
        this.results = res
      })
    },
    _bookmark () {
      apxAlert.noIcon(null, '내 책갈피에 저장되었습니다.', '확인')
    },
    _getThumb () {
      apxAlert.question(null, '이 글에 대한 느낌은?', '추천 👍', '비추천 👎')
    }
  },
  mounted () {
    this._getBookList()
  }
}
</script>

<style scoped>

</style>
