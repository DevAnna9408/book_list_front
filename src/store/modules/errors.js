import router from '@/router'

const state = () => ({
  errors: null, // api 에서 정의된 에러
  globalErrors: null // 전역 처리에러
})

const getters = {
  isGlobalError: state => Boolean(state.globalErrors),
  globalErrors: state => state.globalErrors
}

const mutations = {
  SET_ERROR: (state, _error) => { state.errors = _error },
  SET_GLOBAL_ERROR: (state, _error) => {
    router.push({ name: 'user-login' })
    state.globalErrors = {
      ..._error,
      message: 'ERROR ALERT 다시 시도해 주세요 please try again'
    }
  },
  REMOVE_GLOBAL_ERROR: state => { state.globalErrors = null }
}

const actions = {
  populateErrors: ({ commit }, _error) => {
    commit('SET_GLOBAL_ERROR', _error)
    setTimeout(() => commit('REMOVE_GLOBAL_ERROR'), 4000) // 클릭이벤트시 remove 처리 추가
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
