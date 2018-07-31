const class2type = {}
const toString = class2type.toString
const hasOwn = class2type.hasOwnProperty
const isArray = Array.isArray || function (val) {
  return type(val) === 'array'
}
const hasOwnProperty = function (o, p) {
  return hasOwn.call(o, p)
}

/**
 * 判断两个变量是否相等
 * 数字特殊情况不做判断 如0 == -0
 * regexp不特殊判断
 */
const isEqual = function (a, b) {

  const ret = a === b
  if (ret || (a == null || b == null)) {
    return ret
  }

  let aType = type(a)
  let bType = type(b)
  /**
   * type不同即不相等
   */
  if (aType !== bType) {
    return false
  }

  switch (aType) {
    case 'array':
    case 'object':
      return compareObject(a, b)
      /**
       * new String('a')
       */
    case 'string':
      return a === String(b)
    case 'number':
      return ret
    case 'date':
    case 'boolean':
      return +a === +b
  }

  return ret
}

const compareObject = function (a, b) {
  let p

  if (isArray(a) && isArray(b) && a.length !== b.length) {
    return false
  }

  for (p in b) {
    if (!hasOwnProperty(a, p) && hasOwnProperty(b, p)) {
      return false
    }
  }

  for (p in a) {
    if (!hasOwnProperty(b, p) && hasOwnProperty(a, p)) {
      return false
    }
  }

  for (p in b) {
    if (!isEqual(a[p], b[p])) {
      return false
    }
  }

  return true
}

export default isEqual

'Boolean Number String Function Array Date RegExp Object Error'.replace(/[^, ]+/g, function (name, lc) {
  class2type['[object ' + name + ']'] = (lc = name.toLowerCase())
})

function type(object) {
  if (object == null) {
    return object + ''
  }

  const t = typeof object
  return t === 'object' || t === 'function' ?
    class2type[toString.call(object)] || 'object' :
    t
}
