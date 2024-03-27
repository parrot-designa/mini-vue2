import { mergeOptions } from "../util/options";
import { initRender } from "./render";

export function initMixin(Vue){
    Vue.prototype._init = function (options){
        const vm = this;
        
        vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor),options); 

        debugger;

        initRender(vm);
    }
}

export function resolveConstructorOptions(Ctor) {
    let options = Ctor.options;
    return options
}