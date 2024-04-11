import { createElement } from "@/my-vue/core/vdom/create-element";
import { installRenderHelpers } from './render-helpers/index'

export function initRender(vm){

    vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)

    vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);
}

export function renderMixin(Vue){

    installRenderHelpers(Vue.prototype)

    Vue.prototype._render = function(){
        
        const vm = this;

        const { render } = vm.$options;

        let vnode = render.call(vm,vm.$createElement);

        return vnode;
    }
}