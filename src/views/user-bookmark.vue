<template>
<div id="user-bookmark">
  <ul class="surveys grid">
    <div class="button__menu__wrapper">
      <button
        class="basic__button">
        전체
      </button>
    </div>
    <li
      v-for="(item, index) in 6" :key="index"
      class="survey-item">

      <span class="survey-country grid-only">
        뜨거운 여름밤은 가고 남은건 볼품없지만. 또 다시 찾아오는 누군갈 위해서 남겨두겠소.
      </span>

      <div class="survey-end-date-wrapper">
      <span class="survey-end-date">
         잔나비의
      </span>
        <br />
        <span
          class="survey-end-date">
        - 뜨거운 여름밤은 가고 남은건 볼품 없지만 -
       </span>
        <br />
        <span
          class="survey-end-date">
        중에서
      </span>
      </div>
      <div
        class="button__wrapper"
      >
        <button class="cancel__button">
          해제
        </button>
      </div>
    </li>
  </ul>
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

export default {
  name: 'user-bookmark',
  data () {
    return {
      currentPage: 1,
      results: {
        number: 1,
        totalPages: 10
      }
    }
  },
  methods: {
    _pageInput () {
    }
  }
}
</script>

<style scoped>

</style>
