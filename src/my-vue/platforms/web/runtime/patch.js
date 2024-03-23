
import *  as nodeOps from './node-ops';
import platformModules from '@/my-vue/platforms/web/runtime/modules/index'
import { createPatchFunction } from "@/my-vue/core/vdom/patch";

let modules = platformModules;
export const patch = createPatchFunction({ nodeOps ,modules})