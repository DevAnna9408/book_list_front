<template>
  <div id="table-paging">
    <div class="total-count" v-if="showCount">
      <div>검색결과: <span>{{ results.totalElements }}</span> 건 </div>
    </div>

    <div class="row">
      <div class="col col-12">
        <div class="dashboard-box">
          <div class="content">
            <table class="list-style-table">
              <thead>
                <tr>
                  <th class="appl-list-xs">번호</th>
                  <th v-for="item in header" :key="item.value" :class="item.class">{{ item.value }}</th>
                </tr>
              </thead>
              <tbody>
                <slot name="table-data">
                </slot>
                <tr v-if="results.content.length === 0" class="no-result">
                  <td :colspan="header.length+1">해당 정보 없음</td>
                </tr>
              </tbody>
            </table>
            <pagination
              v-model="currentPage"
              with-text
              :per-page="results.number"
              :page-count="results.totalPages"
              @input="pageInput"
            ></pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  name: 'table-paging',
  props: {
    header: {
      type: Array
    },
    results: {
      type: Object
    },
    showCount: {
      type: Boolean,
      default: true
    },
    perPage: {
      type: Number,
      default: 1
    }
  },
  watch: {
    perPage (val) {
      this.currentPage = val + 1
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  created () {
    this.currentPage = this.perPage + 1
  },
  methods: {
    pageInput (value) {
      this.$emit('page-input', value)
    }
  }
}
</script>
