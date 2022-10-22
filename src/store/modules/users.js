import ajax from '@/wrapper/ajax'
import Cookies from 'js-cookie'
import Vue from 'vue'
import router from '@/router'
Vue.use(Cookies)

const state = () => ({
  accessToken: localStorage.getItem('accessToken') || '',
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  userCustomInfo: localStorage.getItem('userCustomInfo') ? JSON.parse(localStorage.getItem('userCustomInfo')) : {}
})

const getters = {
  authStatus: _state => _state.status,
  isUser: _state => Boolean(_state.accessToken) && Boolean(_state.user),
  userCustomInfo: _state => _state.userCustomInfo,
  isGuest: _state => !_state.accessToken,
  isAuthenticated: _state => Boolean(_state.accessToken),
  loggedInUser: _state => _state.user,
  loggedInAccessToken: _state => _state.accessToken,
  loggedInUserRoleType: (_state, _getters) => _getters.loggedInUser.roles,
  userId: _state => { return _state.user.userId }
}

const mutations = {
  SET_USER: (_state, _user) => {
    localStorage.setItem('user', JSON.stringify(_user))
    _state.user = _user
  },
  SET_ACCESS_TOKEN: (_state, _accessToken) => {
    _state.accessToken = _accessToken
    localStorage.setItem('accessToken', _accessToken)
  },
  SET_USER_CUSTOM_INFO: (_state, _data) => {
    _state.userCustomInfo = _data
    localStorage.setItem('userCustomInfo', JSON.stringify(_data))
  },
  LOGOUT: (_state) => {
    _state.accessToken = null
    _state.user = {}
    localStorage.clear()
    // localStorage.removeItem('accessToken')
    // localStorage.removeItem('user')
    router.push({
      name: 'user-login'
    })
  }
}
const actions = {
  login ({ commit }, _user) {
    return new Promise((resolve, reject) => {
      ajax('POST', '/api/sign-in', _user)
        .then(_data => {
          let accessToken = _data.accessToken
          let _user = {}
          _user.userId = _data.userId
          _user.roles = _data.roles
          commit('SET_ACCESS_TOKEN', accessToken)
          commit('SET_USER', _user)
          commit('SET_USER_CUSTOM_INFO', _data.customInfo)
          resolve(_data)
        })
        .catch(_err => { // 쿠키 기한때문에 처리필요
          reject(_err)
        })
    })
  },
  register ({ commit }, _user) {
    return new Promise((resolve, reject) => {
      ajax('POST', '/api/sign-up', _user)
        .then(_data => {
          let _user = {}
          _user.userId = _data.userId
          _user.roles = _data.roles
          resolve(_data)
        }).catch(_err => {
          reject(_err)
        })
    })
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
