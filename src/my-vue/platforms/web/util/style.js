import { cached } from "@/my-vue/shared/util";

export const parseStyleText = function (cssText) {
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
}
  