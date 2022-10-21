import Vue from 'vue'
import store from '@/store'

Vue.config.errorHandler = err => {
  store.dispatch('errors/populateErrors', {
    detail: err
  })
}
