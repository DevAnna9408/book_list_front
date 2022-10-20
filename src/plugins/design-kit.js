import VueLazyload from 'vue-lazyload'
import VueCarousel from 'vue-carousel'
import Vue from 'vue'

Vue.use(VueCarousel)
Vue.use(VueLazyload, {
  observer: true,
  // optional
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
})
