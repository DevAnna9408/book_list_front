<template>
  <div class="sidebar-container">
    <div class="sidebar">
      <div class="widget foldable">
        <div class="title">
          접수 현황
        </div>
        <div class="content">
          세부 지원현황
        </div>
      </div>

      <div class="widget foldable last">
        <div class="title">
          지원 내역 검색
        </div>
        <div class="content">
          <router-link :to="{ name: 'list' }">목록</router-link>
        </div>
        <div class="content">
          <router-link :to="{ name: 'detail' }">상세</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'main-sidebar'
}
</script>
<style scoped>
</style>
