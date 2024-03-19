import { warn } from "@/my-vue/core/util";
import { initMixin } from "./init";
function Vue(options){
    if(__DEV__ && !(this instanceof Vue)){
        warn("Vue是一个构造函数，应该用' new '关键字调用")
    }

    this._init(options);
}

initMixin(Vue);

export default Vue;