export default class VNode{
    tag;
    data;
    children;
    text;
    elm;
    context;
    componentOptions;
    constructor(
        tag,
        data,
        children,
        text,
        elm,
        context,
        componentOptions
    ){
        this.tag = tag;
        this.data = data;
        this.children = children;
        this.text = text;
        this.elm = elm;
        this.context = context;
        this.componentOptions = componentOptions;
    }
}

export function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val))
}