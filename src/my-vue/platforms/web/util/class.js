import { isDef } from "@/my-vue/shared/util";

export function genClassForVnode(vnode) {
    let data = vnode.data
 
    return renderClass(data.class);
}


export function renderClass(dynamicClass){
    if(isDef(dynamicClass)){
        return dynamicClass;
    }
    return ""
}