export function noop(a, b, c) {}

/**
 * 判断是否是true
 * @returns 
 */
export function isTrue(v){
    return v === true;
}
/**
 * 判断是否是null或undefined
 * @returns 
 */
export function isDef(v) {
    return v !== undefined && v !== null
}

/**
 * 判断是否是数组
 * @returns 
 */
export const isArray = Array.isArray;

/**
 * 判断是否是原始类型
 * @param {} value 
 * @returns 
 */
export function isPrimitive(value){
    return typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'symbol' ||
        typeof value === 'boolean'
}

/**
 * 判断是否是undefined或者null
 * @param {*} v 
 * @returns 
 */
export function isUndef(v){
    return v === undefined || v === null
}

/**
 * 缓存高阶函数
 * @param {*} fn 
 * @returns 
 */
export function cached(fn){
    const cache = Object.create(null);
    return function cachedFn(str) {
      const hit = cache[str]
      return hit || (cache[str] = fn(str))
    }
}
  

export function extend(to, _from){
    // 遍历_from对象的所有可枚举属性（不包括Symbol属性和不可枚举属性）
    for (const key in _from) {
        // 将_from对象上当前迭代到的属性key及其对应的value复制到to对象上
        to[key] = _from[key]
    }
    // 返回经过扩展的to对象
    return to
}

export function toObject(arr) {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}
 
const camelizeRE = /-(\w)/g
export const camelize = cached((str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
})

const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

