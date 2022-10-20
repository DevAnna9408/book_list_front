const getType = target => { return Object.prototype.toString.call(target).slice(8, -1) }
const typeUtil = {
  isString (target) { return getType(target) === 'String' },
  isNumber (target) { return getType(target) === 'Boolean' },
  isBoolean (target) { return getType(target) === 'Boolean' },
  isNull (target) { return getType(target) === 'Null' },
  isUndefined (target) { return getType(target) === 'Undefined' },
  isNullOrUndefined (target) { return typeUtil.isNull(target) || typeUtil.isUndefined(target) },
  isObject (target) { return getType(target) === 'Object' },
  isArray (target) { return getType(target) === 'Array' },
  isDate (target) { return getType(target) === 'Date' },
  isRegExp (target) { return getType(target) === 'RegExp' },
  isFunction (target) { return getType(target) === 'Function' },
  isEmptyObject (target) {
    return Object.keys(target).length === 0 && target.constructor === Object
  },
  isEmptyArray (target) {
    return this.isArray(target) && !this.isNull(target) && target.length === 0
  },
  isEmptyString (target) {
    return typeUtil.isString(target) && target === ''
  }
}

export default typeUtil
