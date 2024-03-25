import { isUndef } from "@/my-vue/shared/util";
import { genClassForVnode } from "../../util/class";

function updateClass(oldVnode,vnode){
    const el = vnode.elm;
    const data = vnode.data;
    
    if ( 
        isUndef(data.class)
    ) {
        return "";
    }

    let cls = genClassForVnode(vnode);

    if(cls){
        el.setAttribute('class',cls)
    }
}

export default {
    create: updateClass,
    update: updateClass
}