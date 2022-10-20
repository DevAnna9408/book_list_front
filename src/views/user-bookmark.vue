<template>
<div id="user-bookmark">
  <ul class="surveys grid">
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
      </div>
      <div
        class="button__wrapper"
      >
        <button class="basic__button">
          버튼
        </button>
        <button class="cancel__button">
          버튼
        </button>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'user-bookmark'
}
</script>

<style scoped>

</style>
