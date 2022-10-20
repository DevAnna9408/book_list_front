import Vue from 'vue'
import { directive as vClickOutside } from 'vue-clickaway'
import { focus } from 'vue-focus'
Vue.directive('click-outside', vClickOutside)
Vue.directive('focus', focus)
