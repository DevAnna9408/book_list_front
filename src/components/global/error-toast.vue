<template>
<div id='error-toast' v-if="isGlobalError">
  <div class="alert-danger">
    <div>
      <button type="button" aria-hidden="true" @click="event => removeNotify(event,'alert-danger')">
        X
        <!-- <md-icon>clear</md-icon>  -->
      </button>
      <div>
      <!--   <md-icon>info_outline</md-icon> -->
      </div>
      {{ errorMessage }}
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'error-toast',
  computed: {
    ...mapGetters('errors', [
      'isGlobalError',
      'globalErrors'
    ]),
    errorMessage () {
      return this.globalErrors.detail.message || this.globalErrors.message
    }
  },
  methods: {
    ...mapMutations('errors', ['REMOVE_GLOBAL_ERROR']),
    ...mapActions({}),
    removeNotify (e, notifyClass) {
      // 1. vuex처리
      this.REMOVE_GLOBAL_ERROR()
      // 2. 화면 처리
      var target = e.target
      while (target.className.indexOf(notifyClass) === -1) {
        target = target.parentNode
      }
      return target.parentNode.removeChild(target)
    }
  }
}
</script>

<style scope>

</style>
