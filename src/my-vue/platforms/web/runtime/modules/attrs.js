import { isUndef } from "@/my-vue/shared/util"

function updateAttrs(oldVnode, vnode){
    debugger;
    if(isUndef(vnode.data.attrs)){
        return ;
    }
    let key, cur, old;
    const elm = vnode.elm;
    const attrs = vnode.data.attrs || {}

    for (key in attrs) {
        cur = attrs[key];
        setAttr(elm, key, cur);
    }
}

function setAttr(el, key, value){
    baseSetAttr(el, key, value)
}

function baseSetAttr(el, key, value){
    el.setAttribute(key, value)
}

export default {
    create: updateAttrs,
    update: updateAttrs
}
  