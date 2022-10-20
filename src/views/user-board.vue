<template>
<div id="user-board">
  <ul class="surveys grid">
    <li
      v-for="(item, index) in 5" :key="index"
      class="survey-item">

      <span class="survey-country grid-only">
        제목
      </span>

        <div class="pull-right">
          <span class="survey-progress">
            <span class="survey-progress-bg">
              <span class="survey-progress-fg" style="width: 88%;" />
          </span>

        <span class="survey-progress-labels">
          <span class="survey-progress-label">
            50%
          </span>

          <span class="survey-completes">
            5 / 10
          </span>
        </span>
      </span>

        <span class="survey-end-date ended">
          내용
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
