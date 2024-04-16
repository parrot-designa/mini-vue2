import { warn } from "@/my-vue/core/util/index";
import Watcher from "../observer/watcher";

export let activeInstance = null

export function setActiveInstance(vm) {
    const prevActiveInstance = activeInstance
    activeInstance = vm
    return () => {
      activeInstance = prevActiveInstance
    }
}

export function lifecycleMixin(Vue){
    Vue.prototype._update = function(vnode){
        const vm = this; 
        const prevVnode = vm._vnode;

        const restoreActiveInstance = setActiveInstance(vm);
        //_vnode属性用于存储当前Vue实例的虚拟节点
        //vnode为当前Vue实例上render的返回值
        vm._vnode = vnode;

        if (!prevVnode) {
            // 初始化渲染 将最新的dom赋值给vm.$el
            vm.$el = vm.__patch__(vm.$el, vnode)
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

    callHook(vm, 'beforeMount');

    let updateComponent = () => {
        vm._update(vm._render())
    }

    new Watcher(
        vm,
        updateComponent
    )
}

export function callHook(
    vm,
    hook
  ) { 
    const handlers = vm.$options[hook] 
    if (handlers) {
      for (let i = 0, j = handlers.length; i < j; i++) {
        handlers[i].call(vm);
      }
    } 
}
  