import { isDef } from "@/my-vue/shared/util";

export function genClassForVnode(vnode) {
    let data = vnode.data
 
    return renderClass(data.staticClass, data.class);
}

export function concat(a, b) {
    return a ? (b ? a + ' ' + b : a) : b || ''
}

export function renderClass(staticClass, dynamicClass){
    if(isDef(staticClass) || isDef(dynamicClass)){
        return concat(staticClass, dynamicClass);
    }
    return ""
}