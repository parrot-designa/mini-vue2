
/**
 * 判断是否是在浏览器环境下
 */
export const inBrowser = typeof window !== 'undefined';

/**
 * 判断是否有开发者工具
 */
export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__

export let supportsPassive = false

if(inBrowser) {
    try {
        const opts = {}
        Object.defineProperty(opts, 'passive', {
          get() {
            /* istanbul ignore next */
            supportsPassive = true
          }
        }) // https://github.com/facebook/flow/issues/285
        window.addEventListener('test-passive', null, opts)
      } catch (e) {}
}
/**
 * 用于检测给定的构造函数（Ctor）是否是原生的JavaScript构造函数
 * @param {*} Ctor 
 * @returns 
 * 1. 首先，使用typeof运算符检查Ctor是否为"function"类型，确保我们处理的是一个函数对象。
 * 2. 然后，对Ctor.toString()的结果执行正则表达式测试 /native code/.test(...)。在JavaScript中，构造函数（或其他函数）的.toString()方法返回函数的字符串表示形式。对于原生构造函数（如Array, Date, Function等），其字符串表示形式中通常包含"native code"字样。
 */
export function isNative(Ctor){
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}