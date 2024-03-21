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