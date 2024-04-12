import { cached } from "@/my-vue/shared/util"

const normalizeEvent = cached((name)=>{
    const passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    const once = name.charAt(0) === '~';
    name = once ? name.slice(1) : name;
    const capture = name.charAt(0) === '!'
    name = capture ? name.slice(1) : name
    return {
        name,
        once,
        capture,
        passive
    }
});

export function updateListeners(
    on,
    add
){
    let name, cur, event;
    for(name in on){
        cur = on[name];
        event = normalizeEvent(name);

        add(event.name , cur)
    }
}