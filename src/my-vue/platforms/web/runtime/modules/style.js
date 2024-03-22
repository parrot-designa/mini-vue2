import { isUndef } from "@/my-vue/shared/util";

function updateStyle(oldVnode, vnode){
    const data = vnode.data;
    const oldData = oldVnode.data;

    //如果没有样式 直接返回
    if(
        isUndef(data.staticStyle) || 
        isUndef(data.style) ||
        isUndef(oldData.staticStyle) ||
        isUndef(oldData.style)    
    ){
        return ;
    }
}

export default {
    create: updateStyle,
    update: updateStyle
}