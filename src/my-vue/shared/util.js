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