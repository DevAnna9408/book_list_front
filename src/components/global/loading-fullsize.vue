<template>
  <div id="loading-fullsize" class="form-loading full-size wait">
      <div class="form-saving">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'loading-full',
  props: {
  }
}
</script>
<style scoped>
.wait {
  cursor: wait
}
</style>
