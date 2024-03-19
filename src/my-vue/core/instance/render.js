import { createElement } from "@/my-vue/core/vdom/create-element";

export function initRender(vm){
    vm.$createElement = (a,b,c,d) => createElement(vm, a, b, c, d, true);
}

export function renderMixin(Vue){
    Vue.prototype._render = function(){
        const vm = this;

        const { render } = vm.$options;

        let vnode = render.call(vm,vm.$createElement);

        return vnode;
    }
}