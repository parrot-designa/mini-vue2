import Vue from '@/my-vue/core/index';
import { query } from "../util/index";
import { mountComponent } from "@/my-vue/core/instance/lifecycle";

Vue.prototype.$mount = function(
    el
){
    el = el ? query(el) : undefined;
    mountComponent(this, el);
}

export default Vue;