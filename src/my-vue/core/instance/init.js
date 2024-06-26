import { mergeOptions } from "../util/options";
import { initRender } from "./render";
import { initState } from "./state";
import { initEvents } from "./event";
import { callHook } from "./lifecycle";

export function initMixin(Vue){
    Vue.prototype._init = function (options){
        const vm = this; 

        vm._self = vm;

        if(options && options._isComponent){
            initInternalComponent(vm, options)
        }else{
            vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor),options);
        }
        //初始化事件
        initEvents(vm);
         
        initRender(vm);

        callHook(vm, 'beforeCreate');
        //初始化state
        initState(vm);

        callHook(vm, 'created')
    }
}

export function initInternalComponent(
    vm,options
){
    const opts = (vm.$options = Object.create(vm.constructor.options));

    const parentVnode = options._parentVnode;
    const vnodeComponentOptions = parentVnode.componentOptions;
    //_parentListeners 是一个内部属性，用于存储父组件传递给子组件的监听器（listeners
    opts._parentListeners = vnodeComponentOptions.listeners

    if (options.render) {
        opts.render = options.render
    }
}

export function resolveConstructorOptions(Ctor) {
    let options = Ctor.options;
    return options
}