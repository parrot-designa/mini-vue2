import { isPlainObject } from "../util";
import { def } from "../util/lang";
import { hasChanged } from "@/my-vue/shared/util";
import Dep from "./dep";

const NO_INITIAL_VALUE = {}

export function defineReactive(
    obj,
    key,
    val
){
    const dep = new Dep();

    const property = Object.getOwnPropertyDescriptor(obj, key);

    const getter = property && property.get
    const setter = property && property.set

    if(val === NO_INITIAL_VALUE){
        val = obj[key];
    }

    Object.defineProperty(obj, key, {
        enumerable:true,
        configurable:true,
        get: function reactiveGetter(){
            const value = getter ? getter.call(obj) : val;
            if(Dep.target){
                dep.depend();
            } 
            return value;
        },
        set: function reactiveSetter(newVal){
            const value = getter ? getter.call(obj) : val;
            if(!hasChanged(value,newVal)){
                return 
            }
            if(setter){
                setter.call(obj, newVal);
            }else{
                val = newVal;
            }
            dep.notify()
        }
    });
}

export class Observer{
    constructor(value){
        //给value定义一个__ob__属性
        def(value, '__ob__', this);
        const keys = Object.keys(value);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            defineReactive(value, key, NO_INITIAL_VALUE, undefined);
        }
    }
}

export function observe(
    value
){
    //判断如果是一个对象 就new一个观察者
    if(isPlainObject(value)){
        return new Observer(value)
    }
}