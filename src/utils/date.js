import Vue from 'vue'
Vue.moment.tz.setDefault('Asia/Seoul')

const dateUtil = {
  formateDateTime (date) {
    return Vue.moment(date).format('YYYYMMDDHHmmss')
  },
  getNowDateTime () {
    return this.formateDateTime(Vue.moment.now())
  },
  formateDate (date) {
    return Vue.moment(date).format('YYYY/MM/DD')
  },
  formateRegisterDate (date) {
    return Vue.moment(date).format('YYMMDD')
  },
  getNowDate () {
    return this.formateDate(Vue.moment.now())
  },
  isNowInPeriod (start, end) {
    return Vue.moment(start) < Vue.moment() && Vue.moment() < Vue.moment(end)
  },
  isOver (date) {
    return Vue.moment(date) < Vue.moment()
  },
  timestampToDateTime (timestamp) {
    return Vue.moment.unix(timestamp).format('YYYY-MM-DD HH:mm:ss')
  }
}

export default dateUtil
