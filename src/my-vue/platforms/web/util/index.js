export * from './element'
export * from './attrs'

//该函数主要负责根据传入参数查找DOM元素
export function query(el){
    if(typeof el === 'string'){
        const selected = document.querySelector(el);

        return selected;
    } else {
        return el;
    }
}