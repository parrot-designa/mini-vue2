
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