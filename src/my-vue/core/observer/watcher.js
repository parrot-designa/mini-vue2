export default class Watcher {
    vm;
    getter;

    constructor(vm,updateCallback){
        this.vm = vm;
        this.getter = updateCallback;

        this.get();
    }

    get(){
        const vm = this.vm;
        this.getter.call(vm, vm);
    }
}