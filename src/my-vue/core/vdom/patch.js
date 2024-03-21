import { isDef,isArray } from "@/my-vue/shared/util"
import VNode from "./vnode";


export function createPatchFunction(backend){
    const { nodeOps } = backend;

    function emptyNodeAt(elm) {
        return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }

    function createChildren(vnode,children,insertedVnodeQueue){
        //正常这里是数组类型，但是也有可能是字符串、数字类型等，例如我们这里的例子一样 children为hello mini-vue2
        
    }

    function createElm(vnode, insertedVnodeQueue,parentElm,refElm){

        //获取 VNode 表示的标签名或组件名称。
        const tag = vnode.tag;
        //获取 VNode 子节点数组
        const children = vnode.children;
        //创建真实的 DOM 元素
        vnode.elm = nodeOps.createElement(tag,vnode);

        //递归地为当前 VNode 的所有子节点创建和挂载对应的 DOM 元素
        createChildren(vnode, children, insertedVnodeQueue)
        //将新创建的 DOM 元素（vnode.elm）插入到指定的父元素（parentElm）中，并可能参考某个参照元素（refElm）
        insert(parentElm, vnode.elm, refElm)

    }  
    
    function insert(parent,elm,ref){
        if(isDef(parent)){

        }else{
            nodeOps.appendChild(parent,elm);
        }
    }

    return function patch(oldVnode,vnode){ 
        //判断是否是一个真实节点，nodeType是DOM元素的一个属性，它表示节点的类型
        const isRealElement = isDef(oldVnode.nodeType)

        if(isRealElement){
            //如果上一次的vnode是真实节点，则基于这个节点创建一个空的虚拟节点
            oldVnode = emptyNodeAt(oldVnode);
        }
        // 存贮上一个节点的真实节点
        const oldElm = oldVnode.elm;
        const parentElm = nodeOps.parentNode(oldElm); 

        createElm(
            vnode,
            [],
            null,
            nodeOps.nextSibling(oldElm)
        )
    }
}