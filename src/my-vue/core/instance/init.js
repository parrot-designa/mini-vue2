import { mergeOptions } from "../util/options";
import { initRender } from "./render";
import { initState } from "./state";

export function initMixin(Vue){
    Vue.prototype._init = function (options){
        const vm = this;
        
        vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor),options);

        vm._self = vm;
         
        initRender(vm);
        //初始化state
        initState(vm)
    }
}

export function resolveConstructorOptions(Ctor) {
    let options = Ctor.options;
    return options
}