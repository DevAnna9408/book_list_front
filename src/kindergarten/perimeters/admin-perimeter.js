import BasePerimeter from './base-perimeter'

export default new BasePerimeter({
  purpose: 'admin',
  can: {
    read () {
      return this.isAdminRole()
    }
  }
})
