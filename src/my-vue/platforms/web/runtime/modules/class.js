import { isUndef } from "@/my-vue/shared/util";
import { genClassForVnode } from "../../util/class";

function updateClass(oldVnode,vnode){
    const el = vnode.elm;
    const data = vnode.data;
    
    if ( 
        isUndef(data.class) 
        && isUndef(data.staticClass)
    ) {
        return ;
    }

    let cls = genClassForVnode(vnode);

    //如果一样 则不进行更新
    if(cls !== el._prevClass){
        el.setAttribute('class',cls);
        el._prevClass = cls
    }
}

export default {
    create: updateClass,
    update: updateClass
}