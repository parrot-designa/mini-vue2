import { isPrimitive, isTrue,isArray,isDef } from "@/my-vue/shared/util";
import { normalizeChildren } from "./helpers/normalize-children";
import { createComponent } from "./create-component";
import { resolveAsset } from "../util/options";
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

    if(isArray(data) || isPrimitive(data)){
        children = data;
        data = undefined; 
    }

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
    let vnode,Ctor;
    if(typeof tag === 'string'){
        if(isDef((Ctor = resolveAsset(context.$options, 'components', tag)))){
            //匹配到 创建component的vnode
            vnode = createComponent(Ctor, data, context, children, tag);
        }else{
            vnode = new VNode(tag,data,children,undefined,undefined,context)
        }
        
    } else {
        vnode = createComponent(tag,data,context,children);
    }
    return vnode;
}