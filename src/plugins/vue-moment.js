import Vue from 'vue'
import vueMoment from 'vue-moment'
import moment from 'moment-timezone'
// vueMoment.tz.setDefault('Asia/Seoul')
// vueMoment.tz.setDefault('America/New_York')
// timezone.tz.setDefault('America/New_York')
// moment.tz.setDefault('America/New_York')
Vue.use(vueMoment, {
  moment
})
