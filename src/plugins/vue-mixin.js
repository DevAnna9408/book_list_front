import Vue from 'vue'
import mixins from '@/mixins/global'
for (let value of Object.values(mixins)) {
  Vue.mixin(value)
}
