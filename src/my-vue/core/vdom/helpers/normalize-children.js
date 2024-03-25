import { isPrimitive,isArray,isFalse,isDef,isUndef } from "@/my-vue/shared/util";
import { createTextVNode } from "../vnode";

export function normalizeChildren(children) {
  return isPrimitive(children) 
    ? [createTextVNode(children)] 
    : isArray(children) 
    ? normalizeArrayChildren(children)
    : undefined;
}

function isTextNode(node){
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}


function normalizeArrayChildren(
  children,
  nestedIndex
){
  const res = [];// 初始化结果数组，用于存放规范化后的子元素
  let i, c, lastIndex, last;
  for( i = 0;i < children.length;i++){
    c = children[i];// 获取当前遍历到的子元素
    if (isUndef(c) || typeof c === 'boolean') continue;// 忽略 undefined 值和布尔值类型的子元素
    //记录前一次插入元素的位置
    lastIndex = res.length - 1
    //记录前一次插入的元素
    last = res[lastIndex];
    // 处理数组类型的子元素
    if(isArray(c)){
      if (c.length > 0) {
        c = normalizeArrayChildren(c); // 递归处理子数组
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text); // 合并首元素与前一元素为文本节点
          c.shift(); // 移除已合并的首元素
        }
        res.push.apply(res, c)// 将处理后的子数组剩余元素插入结果数组
      }
    }else if(isPrimitive(c)){// 处理原始类型（如字符串、数字）的子元素
      //如果上一个节点是文本节点，则将2个进行合并
      if (isTextNode(last)) {
        res[lastIndex] = createTextVNode(last.text + c)// 合并当前子元素与前一文本节点
      } else if(c!==''){// 若当前子元素非空且前一元素不是文本节点，将其转换为文本节点并插入
        res.push(createTextVNode(c));
      }
    }else{  // 处理其他类型的子元素（如对象、VNode 等）
      //检查当前子元素 c 和前一个已处理子元素 last 是否都是文本节点。如果是，说明它们可以合并成一个文本节点以优化渲染
      //这样做将前一个文本节点与当前文本节点的内容合并，同时保留了原有的位置信息，避免了重复创建不必要的文本节点，有助于提高渲染效率。
      if(isTextNode(c) && isTextNode(last)){
        res[lastIndex] = createTextVNode(last.text + c.text)
      }else{
        res.push(c);// 若当前子元素不是文本节点，直接将其插入结果数组
      }
    }
  }
  return res;
}