let uid = 0;

export default class Dep{

    id;
    subs;

    constructor(){
        this.id = uid++;
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub)
    } 

    dep(info){
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