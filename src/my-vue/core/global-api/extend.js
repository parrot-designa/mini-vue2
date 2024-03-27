import { extend } from '../util/index'
import { mergeOptions } from "../util/options";

export function initExtend(Vue) {
    // 初始化全局Vue构造函数的cid计数器
    Vue.cid = 0;
    let cid = 1;

    Vue.extend = function(extendOptions){
        // 检查并初始化extendOptions参数
        extendOptions = extendOptions || {};
        // 获取当前被扩展的基础构造器（即父类构造器）
        // 这里的父类构造器即Vue类本身
        const Super = this;
        // 获取基础构造器的cid 初始化为0
        const SuperId = Super.cid;
        const Sub = function VueComponent(options) {
            // 调用初始化方法
            this._init(options)
        }
        // 设置子构造器原型链继承自基础构造器
        Sub.prototype = Object.create(Super.prototype);
        // 设置子构造器的constructor属性指向自身
        Sub.prototype.constructor = Sub;

        // 给子构造器分配一个唯一的cid，并递增全局cid计数器
        Sub.cid = cid++;

        // 将基础构造器赋值给子构造器的'super'属性
        Sub['super'] = Super;
        // 将extend传入的option传入到构造函数的options上
        Sub.options = mergeOptions(Super.options, extendOptions)
        // 保存原始超类选项，以便后续检测是否更新
        Sub.extendOptions = extendOptions
        return Sub;
    }
}