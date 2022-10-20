import axios from 'axios'
import store from '@/store'
import apxAlert from '@/wrapper/apex-alert'
import { i18n } from '@/plugins/i18n'

const API_DOMAIN = process.env.VUE_APP_API_DOMAIN

const FORBIDDEN = 403
const UNAUTHORIZED = 401
const BAD_REQUEST = 400
const INTERNAL_SERVER_ERROR = 500

const setError = (_data, errTitle) => {
  let message = _data.warningMessage || _data.message
  apxAlert.warning(errTitle, message || i18n.t('error.server'))
  store.commit('errors/SET_ERROR', _data)
  throw _data
}

const setGlobalError = _data => {
  store.dispatch('errors/populateErrors', {
    'detail': {
      message: i18n.t('error.server')
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
  apxAlert.warning('', _err.warningMessage || _err.message)
  store.commit('errors/SET_ERROR', _err)
  store.commit('users/LOGOUT')
  throw _err
}

function exception (result, errTitle, alert) {
  if (result instanceof Error && result.message === 'Network Error') {
    setNetworkError(result, alert)
  } else {
    let err = result.response // api에서 통신이 되었다 전체
    switch (err.status) {
      case UNAUTHORIZED : // 401(인증)경우 로그인 페이지로 이동시킨다
        removeAccessToken(err.data)
        break
      case FORBIDDEN:
        if (!store.getters['errors/isGlobalError']) { setGlobalError(err.data) }
        break
      case BAD_REQUEST:
      case INTERNAL_SERVER_ERROR:
        setError(err.data, errTitle) // 사용자 에러 처리
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

export const ajaxAll = requests => {
  return axios.all(requests)
    .then(result => result)
    .catch(result => {
      exception(result)
    })
}

export default ajax
