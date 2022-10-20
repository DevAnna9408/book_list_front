import Vue from 'vue'
import store from '@/store'

Vue.config.errorHandler = err => {
  console.log(err) // FIXME: 개발완료시 삭제필요
  store.dispatch('errors/populateErrors', {
    detail: err
  })
}
