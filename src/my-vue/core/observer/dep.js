let uid = 0;

export default class Dep{

    id;
    subs;

    constructor(){
        this.id = uid++;
        this.subs = [];
    }

    notify(){
        const subs = this.subs.filter(s => s);
    }

}