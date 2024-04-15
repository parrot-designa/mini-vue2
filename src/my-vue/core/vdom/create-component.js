import VNode from "./vnode";
import { isUndef,isObject } from "@/my-vue/shared/util";
import { activeInstance } from "../instance/lifecycle";

export function getComponentName(options) {
    return options.name;
}

const componentVNodeHooks = {
    init(vnode,hydration){
        if(
            vnode.componentInstance && 
            !vnode.componentInstance._isDestroyed &&
            vnode.data.keepAlive
        ){
            const mountedNode = vnode;
            componentVNodeHooks.prepatch(mountedNode,mountedNode);
        }else{
            const child = (vnode.componentInstance = createComponentInstanceForVnode(
                vnode,
                activeInstance
            ));
            child.$mount(hydration ? vnode.elm : undefined , hydration);
        }
    }
};

const hooksToMerge = Object.keys(componentVNodeHooks)

export function createComponentInstanceForVnode(
    vnode,
    parent
){
    const options = {
        _isComponent:true,
        _parentVnode:vnode,
        parent
    }
    return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks(data){
    const hooks = data.hook || (data.hook = {});
    for(let i=0; i<hooksToMerge.length; i++){
        const key = hooksToMerge[i]
        const existing = hooks[key]
        const toMerge = componentVNodeHooks[key]
        if (existing !== toMerge && !(existing && existing._merged)) {
            hooks[key] = existing ? mergeHook(toMerge, existing) : toMerge
        }
    }
}

function mergeHook(f1, f2){
    const merged = (a, b) => {
      f1(a, b)
      f2(a, b)
    }
    merged._merged = true
    return merged
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
    // 基础构造器 即Vue
    const baseCtor = context.$options._base;

    // 使用Vue.extends生成一个Vue组件实例
    if (isObject(Ctor)) {
        Ctor = baseCtor.extend(Ctor)
    } 

    data = data || {};

    const listeners = data.on; 

    installComponentHooks(data);

    //初始化时这里的tag没有传入 即为undefined 再者没有定义name属性 所以这里的name为空
    const name = getComponentName(Ctor.options) || tag

    const vnode = new VNode(
        `vue-component-${Ctor.cid}${name ? `-${name}` :''}`,
        data,
        undefined,
        undefined,
        undefined,
        context,
        { Ctor, children ,listeners},
    )

    return vnode;
}