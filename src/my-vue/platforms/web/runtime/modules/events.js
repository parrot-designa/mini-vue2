import { isUndef } from "@/my-vue/shared/util";
import { supportsPassive } from "@/my-vue/core/util";
import { updateListeners } from "@/my-vue/core/vdom/helpers/update-listeners";

function add(
    name,
    handler,
    capture,
    passive
){
    target.addEventListener(
        name,
        handler,
        supportsPassive ? { capture, passive } : capture
    )
}

let target;

function updateDOMListeners(oldVnode,vnode){
    if(isUndef(vnode.data.on)){
        return ;
    }
    const on = vnode.data.on || {}
    target = vnode.elm;
    updateListeners(on,add)
    target = undefined;
}

export default {
    create: updateDOMListeners
}