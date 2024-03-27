import VNode from "./vnode";
import { isUndef } from "@/my-vue/shared/util";

export function getComponentName(options) {
    return options.name;
}

export function createComponent(
    Ctor,
    data,
    context,
    children,
    tag
){
    if (isUndef(Ctor)) {
        return
    }

    const name = getComponentName(Ctor.options) || tag

    const vnode = new VNode(
        `vue-component-${name}`,
        data,
        undefined,
        undefined,
        undefined,
        context,
    )

    return vnode;
}