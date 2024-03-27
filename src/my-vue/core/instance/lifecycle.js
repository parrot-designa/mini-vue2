import { warn } from "@/my-vue/core/util/index";
import Watcher from "../observer/watcher";

export function lifecycleMixin(Vue){
    Vue.prototype._update = function(vnode){
        debugger;
        const vm = this; 
        const prevVnode = vm._vnode

        vm._vnode = vnode;

        if (!prevVnode) {
            // initial render
            vm.__patch__(vm.$el, vnode)
        }

    }
}

export function mountComponent(
    vm,
    el
){
    vm.$el = el

    if (!vm.$options.render) {
        warn("必须要有render方法");
    }

    let updateComponent = () => {
        vm._update(vm._render())
    }

    new Watcher(
        vm,
        updateComponent
    )
}