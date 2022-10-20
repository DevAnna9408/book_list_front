let myBody = document.getElementsByTagName('body')[0]
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    createScroll () {
      myBody.classList.add('html-overflow')
    },
    deleteScroll () {
      myBody.classList.remove('html-overflow')
    }
  }
}
