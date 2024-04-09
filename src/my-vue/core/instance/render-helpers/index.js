import { createTextVNode } from "@/my-vue/core/vdom/vnode";
import { toString } from "@/my-vue/shared/util";

export function installRenderHelpers(target) {
    target._v = createTextVNode;
    target._s = toString;
}