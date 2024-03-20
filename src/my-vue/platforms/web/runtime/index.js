import Vue from '@/my-vue/core/index';
import { query } from "../util/index";
import { patch } from "./patch";
import { mountComponent } from "@/my-vue/core/instance/lifecycle";

Vue.prototype.__patch__ = patch;

Vue.prototype.$mount = function(
    el
){
    el = el ? query(el) : undefined;
    mountComponent(this, el);
}

export default Vue;