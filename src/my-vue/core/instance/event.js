import { updateListeners } from "../vdom/helpers/update-listeners";

export function initEvents(vm) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false

  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}

export function updateComponentListeners(
  vm,
  listeners,
  oldListeners
) {
  target = vm
  updateListeners(
    listeners, 
    add
  )
  target = undefined
}
