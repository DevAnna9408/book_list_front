<template>
<div id="user-post">
  <ul class="surveys grid">
    <li class="survey-item">
      <span class="survey-country grid-only">
              <div class="user__post__content">
                <input-text-area
                  :maxlength="'100'"
                  v-model="userBoardIn.content"
                  :placeholder="'내 마음에 와닿은,\n\n다른 사람과 공유하고 싶은\n\n글귀를 적어 주세요 :)'"
                />
              </div>
      </span>
      <div class="survey-end-date-wrapper">
        <span class="survey-end-date">
          <input-text
            class="user_add_post__title__input"
            :maxlength="50"
            :placeholder="'작가 혹은 가수'"
            v-model="userBoardIn.author"
            />
          <input-text
            class="user_add_post__title__input"
            :maxlength="50"
            :placeholder="'제목 혹은 곡명'"
            v-model="userBoardIn.title"
          />
      </span>
      </div>
      <div
      class="button__wrapper"
      >
        <button class="basic__button">
          작성
        </button>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'user-post',
  data () {
    return {
      userBoardIn: {
        title: '',
        content: '',
        author: ''
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
