import { isUndef, camelize, hyphenate,cached} from "@/my-vue/shared/util";
import { normalizeStyleBinding } from "../../util/style";

const cssVarRE = /^--/
const importantRE = /\s*!important$/
const vendorNames = ['Webkit', 'Moz', 'ms']

let emptyStyle
const normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style
  prop = camelize(prop)
  if (prop !== 'filter' && prop in emptyStyle) {
    return prop
  }
  const capName = prop.charAt(0).toUpperCase() + prop.slice(1)
  for (let i = 0; i < vendorNames.length; i++) {
    const name = vendorNames[i] + capName
    if (name in emptyStyle) {
      return name
    }
  }
})

const setProp = (el, name, val) => {
  /**
   * 如果是css变量 直接设置
   */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val)
  } else if (importantRE.test(val)) {
    el.style.setProperty(
      hyphenate(name),
      val.replace(importantRE, ''),
      'important'
    )
  } else {
    const normalizedName = normalize(name)
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (let i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i]
      }
    } else {
      el.style[normalizedName] = val
    }
  }
}

function updateStyle(oldVnode, vnode){
    const data = vnode.data;
    const oldData = oldVnode.data; 

    let name,cur;

    //如果没有样式 直接返回
    if(
        isUndef(data.staticStyle) && 
        isUndef(data.style) &&
        isUndef(oldData.staticStyle) &&
        isUndef(oldData.style)    
    ){
        return ;
    }

    const el = vnode.elm;
    const newStyle = normalizeStyleBinding(vnode.data.style) || {};

    for(name in newStyle){
        cur = newStyle[name];
        setProp(el, name, cur);
    } 
}

export default {
    create: updateStyle,
    update: updateStyle
}