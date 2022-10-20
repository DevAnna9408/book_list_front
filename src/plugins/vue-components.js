import Vue from 'vue'
import component from '@/components/global'
for (let value of Object.values(component)) {
  Vue.component(value.name, value)
}
