import { warn } from "@/my-vue/core/util/index";
import Watcher from "../observer/watcher";

export function mountComponent(
    vm,
    el
){
    vm.$el = el

    if (!vm.$options.render) {
        warn("必须要有render方法");
    }

    let updateComponent = () => {
        vm._update(vm._render())
    }

    new Watcher(
        vm,
        updateComponent
    )
}