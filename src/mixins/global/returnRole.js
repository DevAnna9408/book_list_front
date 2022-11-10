import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      roles: 'users/loggedInUserRoleType'
    })
  },
  methods: {
    returnRole () {
      let role = this.roles[0].code
      return role
    }
  }
}
