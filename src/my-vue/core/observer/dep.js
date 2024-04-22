let uid = 0;

export default class Dep{

    id;
    subs;

    constructor(){
        this.id = uid++;
        this.subs = [];
    }

    addSub(sub) {
        // 这里的sub相当于watcher watcher被添加进subs数组中
        this.subs.push(sub)
    } 

    depend(){
        // Dep.target 表示 正在收集的watcher依赖
        if(Dep.target){
            Dep.target.addDep(this);
        }
    }

    notify(){
        const subs = this.subs.filter(s => s);

        for (let i = 0, l = subs.length; i < l; i++) {
            const sub = subs[i];
            sub.update();
        }
    }

}

Dep.target = null;
const targetStack = [];

export function pushTarget(target){
    targetStack.push(target);
    Dep.target = target;
}