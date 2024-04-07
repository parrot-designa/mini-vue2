import { createTextVNode } from "@/my-vue/core/vdom/vnode";

export function installRenderHelpers(target) {
    target._v = createTextVNode
}