import VNode from "./vnode";
import { isUndef,isObject } from "@/my-vue/shared/util";

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

    const baseCtor = context.$options._base;

    // plain options object: turn it into a constructor
    if (isObject(Ctor)) {
        Ctor = baseCtor.extend(Ctor)
    }

    data = data || {};
    const listeners = data.on
    data.on = data.nativeOn

    const name = getComponentName(Ctor.options) || tag

    const vnode = new VNode(
        `vue-component-${Ctor.cid}${name ? name :''}`,
        data,
        undefined,
        undefined,
        undefined,
        context,
        { Ctor, listeners },
    )

    return vnode;
}