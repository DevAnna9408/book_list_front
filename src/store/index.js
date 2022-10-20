import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

const state = () => ({
  loading: false,
  prepage: null
})
const getters = {
  loading: _state => _state.loading,
  prepage: _state => _state.prepage
}

const mutations = {
  SET_LOADING: (_state, payload) => {
    _state.loading = payload
  },
  SET_PREPAGE: (_state, payload) => {
    _state.prepage = payload
  }
}

const store = new Vuex.Store({
  modules,
  state,
  getters,
  mutations
})

export default store
