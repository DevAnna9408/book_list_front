import axios from 'axios'
import store from '@/store'
import sweetAlert from '@/wrapper/sweet-alert'

const API_DOMAIN = process.env.VUE_APP_API_DOMAIN

const FORBIDDEN = 403
const UNAUTHORIZED = 401
const BAD_REQUEST = 400
const INTERNAL_SERVER_ERROR = 500

const setError = (_data) => {
  sweetAlert.noIcon(null, _data.message, '확인')
  store.commit('errors/SET_ERROR', _data)
  throw _data
}

const setGlobalError = _data => {
  store.dispatch('errors/populateErrors', {
    'detail': {
      message: '서버에서 에러가 발생했습니다.'
    }
  })
  throw _data
}

const setNetworkError = (result, alert) => {
  if (alert) {
    return setGlobalError(result)
  } else {
    store.commit('errors/SET_ERROR', result)
    throw result
  }
}

const removeAccessToken = _err => {
  sweetAlert.noIcon('', _err.message, '확인')
  store.commit('errors/SET_ERROR', _err)
  store.commit('users/LOGOUT')
  throw _err
}

function exception (result, errTitle, alert) {
  if (result instanceof Error && result.message === 'Network Error') {
    setNetworkError(result, alert)
  } else {
    let err = result.response
    switch (err.status) {
      case UNAUTHORIZED :
        removeAccessToken(err.data)
        break
      case FORBIDDEN:
        if (!store.getters['errors/isGlobalError']) { setGlobalError(err.data) }
        break
      case BAD_REQUEST:
      case INTERNAL_SERVER_ERROR:
        setError(err.data) // 사용자 에러 처리
        break
      // 서버가 끊길 때는 status가 상태코드로 오지 않고 문자로 온다.
      case 'INTERNAL_SERVER_ERROR':
        setGlobalError(err.data)
        break
      default:
        setNetworkError(result, alert)
    }
  }
}

export const ajax = (method, url, data, header, params, errTitle, alert = true) => {
  let accessToken = store.getters['users/loggedInAccessToken']
  let locale = store.getters['i18N/currentLocale']
  store.commit('SET_LOADING', true)
  return axios({
    method,
    url: API_DOMAIN + url,
    data,
    headers: { ...header, 'Content-Type': 'application/json; charset=utf-8', 'Accept-Language': locale, Authorization: `Bearer ${accessToken}` },
    params
  })
    .then(result => {
      return result.data
    })
    .catch(result => {
      exception(result, errTitle, alert)
    }).finally(() => {
      store.commit('SET_LOADING', false)
    })
}

export const ajaxWithoutLoading = (method, url, data, header, params, errTitle, alert = true) => {
  let accessToken = store.getters['users/loggedInAccessToken']
  let locale = store.getters['i18N/currentLocale']
  return axios({
    method,
    url: API_DOMAIN + url,
    data,
    headers: { ...header, 'Content-Type': 'application/json; charset=utf-8', 'Accept-Language': locale, Authorization: `Bearer ${accessToken}` },
    params
  })
    .then(result => {
      return result.data
    })
    .catch(result => {
      exception(result, errTitle, alert)
    }).finally(() => {
      store.commit('SET_LOADING', false)
    })
}

export default ajax
