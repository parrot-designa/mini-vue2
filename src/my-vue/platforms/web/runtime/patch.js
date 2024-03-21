
import *  as nodeOps from './node-ops';
import { createPatchFunction } from "@/my-vue/core/vdom/patch";

export const patch = createPatchFunction({ nodeOps })