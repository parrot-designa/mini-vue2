import { noop } from "@/my-vue/shared/util"

export let warn = noop; 

if(__DEV__){
    const hasConsole = typeof console !== 'undefined';

    if(hasConsole){
        warn = (msg)=>{
            console.error(`[Vue warn]: ${msg}`)
        }
    }
}