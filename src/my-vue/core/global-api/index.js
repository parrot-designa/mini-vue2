import config from '../config';
import { warn } from "@/my-vue/core/util";
import { initExtend } from './extend';

export function initGlobalAPI(Vue) {
    const configDef = {};
    configDef.get = () => config;
    if (__DEV__) {
        configDef.set = () => {
            warn(
                '请勿更换Vue。配置对象，而是设置单个字段。'
            )
        }
    }
    Object.defineProperty(Vue, 'config', configDef)

    //创建options
    Vue.options = Object.create(null);
    Vue.options._base = Vue;

    initExtend(Vue);
}