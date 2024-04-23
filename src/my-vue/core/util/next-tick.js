import { isNative } from "./env";

const callbacks = []; 

function flushCallbacks() {
    const copies = callbacks.slice(0)
    callbacks.length = 0
    for (let i = 0; i < copies.length; i++) {
        copies[i]()
    }
}

let timerFunc

if(typeof Promise !== 'undefined' && isNative(Promise)){
    const p = Promise.resolve()
    timerFunc = () => {
        p.then(flushCallbacks)
    }
}else{
    timerFunc = () => {
        setTimeout(flushCallbacks, 0)
    }
}

export function nextTick(cb){
    callbacks.push(()=>{
        console.log("callback call")
        if(cb){
            cb.call()
        }
    }); 
    timerFunc(); 
}