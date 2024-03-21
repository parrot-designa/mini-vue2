import { isTrue } from "@/my-vue/shared/util";
import { normalizeChildren } from "./helpers/normalize-children";
import VNode from './vnode';


const SIMPLE_NORMALIZE = 1
const ALWAYS_NORMALIZE = 2

export function createElement(
    context,
    tag,
    data,
    children,
    normalizationType,
    alwaysNormalize
){
    if(isTrue(alwaysNormalize)){
        normalizationType = ALWAYS_NORMALIZE;
    }

    return _createElement(context, tag, data, children, normalizationType);
}

export function _createElement(
    context,
    tag,
    data,
    children,
    normalizationType
){
    if (normalizationType === ALWAYS_NORMALIZE) {
        children = normalizeChildren(children);
    }
    let vnode;
    if(typeof tag === 'string'){
        vnode = new VNode(tag,data,children,undefined,undefined,context)
    }
    return vnode;
}