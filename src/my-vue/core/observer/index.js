import { isPlainObject } from "../util";
import { def } from "../util/lang";
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
        }
    });
}

export class Observer{
    constructor(value){
        def(value, '__ob__', this);
        const keys = Object.keys(value);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            defineReactive(value, key, NO_INITIAL_VALUE, undefined, shallow, mock)
        }
    }
}

export function observe(
    value
){
    if(isPlainObject(value)){
        return new Observer(value)
    }
}