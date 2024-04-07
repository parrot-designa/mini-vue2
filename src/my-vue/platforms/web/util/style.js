import { cached, isArray, toObject, extend } from "@/my-vue/shared/util";

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

// 合并同一个虚拟节点上的静态和动态样式数据
function normalizeStyleData(data) {
  const style = normalizeStyleBinding(data.style);
  return data.staticStyle ? extend(data.staticStyle, style) : style
}

/**
 * 确保父组件的样式优先级高于子组件的样式，这样父组件的样式能够覆盖子组件的样式。
 * @param {*} vnode 类型为VNodeWithData，代表一个带有数据的虚拟节点（Virtual Node），它是Vue.js内部用于构建和更新DOM结构的基本单元。
 * @param {*} checkChild 布尔类型，表示是否需要检查子节点的样式数据。
 */
export function getStyle(vnode, checkChild) {
  //声明一个空对象res，用于存储收集到的样式数据。
  const res = {}
  //声明一个变量styleData，用于临时存储从节点中提取出来的样式数据。
  let styleData
  //如果checkChild为true，则开始遍历子节点。初始化childNode为传入的vnode，并在子节点存在组件实例（即子节点也是一个组件）时进入循环。
  if (checkChild) {
    let childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode &&
        childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        //在循环体内，将childNode设置为其组件实例对应的虚拟节点。如果childNode存在、拥有数据，并且可以从中提取出样式数据，则将样式数据添加至res对象中，这里使用了normalizeStyleData函数来标准化样式数据，并通过extend函数合并样式数据。
        extend(res, styleData)
      }
    }
  }
  //接着处理当前传入的vnode本身的数据，提取并标准化样式数据，然后合并至res对象。
  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData)
  }
  let parentNode = vnode
  // @ts-expect-error parentNode.parent not VNodeWithData
  // 初始化parentNode为当前vnode，然后向上遍历父节点。尽管 TypeScript 编译时会报错（因为parentNode.parent并未被类型定义为VNodeWithData），但在运行时仍会尝试获取每个父节点的样式数据，并将其标准化并合并至res对象。
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData)
    }
  }
  return res
}
