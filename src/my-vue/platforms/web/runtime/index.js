import Vue from '@/my-vue/core/index';
import config from "@/my-vue/core/config";
import { devtools, inBrowser } from '@/my-vue/core/util/index'
import { query,isReservedTag } from "../util/index";
import { patch } from "./patch";
import { mountComponent } from "@/my-vue/core/instance/lifecycle";

Vue.config.isReservedTag = isReservedTag;

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
        if (
            __DEV__ &&
            process.env.NODE_ENV !== 'test' &&
            config.productionTip !== false &&
            typeof console !== 'undefined'
        ) {
            // @ts-expect-error
            console[console.info ? 'info' : 'log'](
                `您正在以开发模式运行Vue。\n` +
                `在进行生产部署时，请确保打开生产模式。\n`
            )
        }
    },0);
}

export default Vue;