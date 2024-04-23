import { pushTarget,popTarget } from "./dep";
import { queueWatcher } from "./scheduler";

export default class Watcher {
    vm;
    getter;
    depIds;
    newDepIds;
    newDeps;

    constructor(
        vm,
        updateCallback,
        cb,
        options
    ){
        this.vm = vm;

        if(options){
            this.lazy = !!options.lazy;
            this.sync = !!options.sync
        }

        this.getter = updateCallback;
        this.newDeps = [];
        this.depIds = new Set();
        this.newDepIds = new Set();

        this.get();
    }

    addDep(dep){
        const id = dep.id
        //避免重复添加Dep
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id)
            this.newDeps.push(dep)
            if (!this.depIds.has(id)) {
                // 在 Dep 实例上添加对应watcher实例
                dep.addSub(this)
            }
        } 
    }

    get(){
        //将当前watcher实例赋值给Dep.target
        pushTarget(this);
        const vm = this.vm;
        try{
            // 调用更新渲染方法
            this.getter.call(vm, vm);
        } catch(e){

        } finally{
            popTarget();
        } 
    }

    run(){
        this.get();
    }

    update(){
        queueWatcher(this);
    }
}