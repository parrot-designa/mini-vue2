import { updateListeners } from "../vdom/helpers/update-listeners";
import { toArray } from "@/my-vue/shared/util";

let target;

function add(event, fn) {
  target.$on(event, fn)
}

export function initEvents(vm) {
  vm._events = Object.create(null);

  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}

export function updateComponentListeners(
  vm,
  listeners
) {
  target = vm
  updateListeners(
    listeners, 
    add
  )
  target = undefined
}

export function eventsMixin(Vue){
  Vue.prototype.$on = function(
    event,
    fn
  ){
    const vm = this;
    (vm._events[event] || (vm._events[event] = [])).push(fn);
    return vm;
  } 

  Vue.prototype.$emit = function(
    event
  ){
    const vm = this;
    let cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      const args = toArray(arguments, 1);
      for (let i = 0, l = cbs.length; i < l; i++) {
        let handler = cbs[i];
        args ? handler.apply(vm, args) : handler.call(context)
      }
    }
    return vm;
  }
}