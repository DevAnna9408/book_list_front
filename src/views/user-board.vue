<template>
<div id="user-board">
  <ul class="surveys grid">
    <li
      v-for="(item, index) in 6" :key="index"
      class="survey-item">

      <span class="survey-country grid-only">
        뜨거운 여름밤은 가고 남은건 볼품없지만. 또 다시 찾아오는 누군갈 위해서 남겨두겠소.
      </span>

        <div class="pull-right">
          <span class="survey-progress">
            <span class="survey-progress-bg">
              <span class="survey-progress-fg" style="width: 50%;" />
          </span>

        <span class="survey-progress-labels">
          <span class="survey-progress-label">
            50%
          </span>

          <span class="survey-completes">
            5 / 10
          </span>

<!--          <span class="survey-completes">-->
<!--            <i class="fa-solid fa-house" /> / <i class="fa-solid fa-house" />-->
<!--          </span>-->

        </span>
      </span>
      </div>
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
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'user-board'
}
</script>

<style scoped>

</style>
