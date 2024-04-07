import { isUndef } from "@/my-vue/shared/util"

function updateAttrs(oldVnode, vnode){
    if(isUndef(vnode.data.attrs)){
        return ;
    }
    let key, cur, old;
    const elm = vnode.elm;
    const attrs = vnode.data.attrs || {}

    for (key in attrs) {
        cur = attrs[key]  
        setAttr(elm, key, cur);
    }
}

function setAttr(el, key, value){

}

export default {
    create: updateAttrs,
    update: updateAttrs
}
  