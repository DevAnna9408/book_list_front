import BasePerimeter from './base-perimeter'

export default new BasePerimeter({
  purpose: 'user',
  can: {
    read () {
      return this.isUserRole()
    }
  }
})
