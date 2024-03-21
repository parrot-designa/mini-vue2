import { isDef } from "@/my-vue/shared/util"
import VNode from "./vnode";


export function createPatchFunction(backend){
    const { nodeOps } = backend;

    function emptyNodeAt(elm) {
        return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }

    function createElm(vnode, insertedVnodeQueue,parentElm,refElm){
        vnode.elm = nodeOps.createElement(tag,vnode);

        createChildren(vnode, children, insertedVnodeQueue)

        insert(parentElm, vnode.elm, refElm)

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