import {
  Perimeter
} from 'vue-kindergarten'
import typeUtil from '@/utils/type'
import Constants from '@/Constants'
export default class BasePerimeter extends Perimeter {
  isLogin () {
    return !typeUtil.isNullOrUndefined(this.child.roles)
  }
  isTargetRole (_targetRole) {
    return typeUtil.isNullOrUndefined(this.child.roles) ? false : this.child.roles.some(role => {
      return role.code === _targetRole
    })
  }
  isAdminRole () {
    return this.isTargetRole(Constants.ROLE_TYPE.SYS_ADMIN)
  }
  isUserRole () {
    return this.isTargetRole(Constants.ROLE_TYPE.USER)
  }
  isCreator (creId) {
    return this.child.userId === creId
  }
}

// export const createPerimeter = (...args) => new BasePerimeter(...args)
// FIXME: (김혜연)
// perimeter 구현할 때마다 new 키워드를 사용하지 않게 하려고 했으나,
// perimeters/index.js 에서 export default~부분에서 에러 발생
