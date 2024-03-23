import { cached, isArray, toObject,extend } from "@/my-vue/shared/util";

export function normalizeStyleBinding(bindingStyle) {
  if (isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle;
}

/**
 * 将文本转化为对象
 */
export const parseStyleText = cached(function (cssText) {
    const res = {}
    const listDelimiter = /;(?![^(]*\))/g
    const propertyDelimiter = /:(.+)/
    cssText.split(listDelimiter).forEach(function (item) {
      if (item) {
        const tmp = item.split(propertyDelimiter)
        tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim())
      }
    })
    return res
});

function normalizeStyleData(data){
  const style = normalizeStyleBinding(data.style);
  return data.staticStyle ? extend(data.staticStyle, style) : style
}
  
// export function getStyle(vnode, checkChild) {
//   const res = {}
//   let styleData

//   if (checkChild) {
//     let childNode= vnode
//     while (childNode.componentInstance) {
//       childNode = childNode.componentInstance._vnode
//       if (
//         childNode &&
//         childNode.data &&
//         (styleData = normalizeStyleData(childNode.data))
//       ) {
//         extend(res, styleData)
//       }
//     }
//   }

//   if ((styleData = normalizeStyleData(vnode.data))) {
//     extend(res, styleData)
//   }

//   let parentNode = vnode
//   // @ts-expect-error parentNode.parent not VNodeWithData
//   while ((parentNode = parentNode.parent)) {
//     if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
//       extend(res, styleData)
//     }
//   }
//   return res
// }
