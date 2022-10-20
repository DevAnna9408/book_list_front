import VueLazyload from 'vue-lazyload'
import Vue from 'vue'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png',
  loading: 'https://d2v80xjmx68n4w.cloudfront.net/gigs/CRRvN1562191553.jpg',
  attempt: 1,
  // 기준점(로딩이미지)이 보일때 이미지 불러오는 옵션
  observer: true,

  observerOptions: {
    rootMargin: '0px',
    // loading 이미지가 90% 보일때 불러옴
    threshold: 0.1
  }
})
