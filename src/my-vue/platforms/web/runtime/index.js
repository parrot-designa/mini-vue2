import Vue from '@/my-vue/core/index';
import config from "@/my-vue/core/config";
import { devtools, inBrowser } from '@/my-vue/core/util/index'
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

if(inBrowser){
    setTimeout(()=>{
        if(config.devtools){
            if(devtools){
                devtools.emit("init",Vue);
            } else if (__DEV__ && process.env.NODE_ENV !== 'test') {
                // @ts-expect-error
                console[console.info ? 'info' : 'log'](
                    '请下载Vue开发者工具，以获得更好的开发体验'
                )
            }
        }
    },0);
}

export default Vue;