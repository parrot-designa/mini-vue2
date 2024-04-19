import { pushTarget } from "./dep";

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
        const id = dep.id;
        if(!this.newDepIds.has(id)){
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            if (!this.depIds.has(id)) {
                dep.addSub(this)
            }
        }
    }

    get(){
        pushTarget(this);

        const vm = this.vm;
        this.getter.call(vm, vm);
    }

    update(){
        queueWatcher(this);
    }
}