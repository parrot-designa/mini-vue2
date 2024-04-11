import { noop,isFunction } from "@/my-vue/shared/util";

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
}

export function proxy(target, sourceKey, key){
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

export function initState(vm){
    const opts = vm.$options;

    if (opts.data) {
        initData(vm)
    }
}

function initData(vm){
    let data = vm.$options.data;
    data = vm._data = isFunction(data) ? getData(data, vm) : data || {};

    const keys = Object.keys(data);
    let i = keys.length;

    while(i--){
        const key = keys[i]
        proxy(vm, `_data`, key)
    }
}

export function getData(data, vm){
    return data.call(vm, vm);
}