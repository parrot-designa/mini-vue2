import { isDef,isArray, isPrimitive } from "@/my-vue/shared/util"
import VNode from "./vnode";


export function createPatchFunction(backend){
    const { nodeOps } = backend;

    function emptyNodeAt(elm) {
        return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }

    function createChildren(vnode,children,insertedVnodeQueue){
        //假设是字符串、数字类型等，我们将其直接挂载到vnode的真实元素下
        if(isPrimitive(vnode.text)){
            nodeOps.appendChild(vnode.elm,nodeOps.createTextNode(vnode.text))
        }else if(isArray(children)){
            for(let i=0;i<children.length;++i){
                createElm(
                    children[i],
                    insertedVnodeQueue,
                    vnode.elm,
                    null
                )
            }
        }
    }

    function createElm(vnode, insertedVnodeQueue,parentElm,refElm){
        debugger;

        //获取 VNode 表示的标签名或组件名称。
        const tag = vnode.tag;
        //获取 VNode 子节点数组
        const children = vnode.children;
        //创建真实的 DOM 元素
        // 如果vnode有标签
        if(isDef(tag)){
            vnode.elm = nodeOps.createElement(tag,vnode);
             //递归地为当前 VNode 的所有子节点创建和挂载对应的 DOM 元素
            createChildren(vnode, children); 
             //将新创建的 DOM 元素（vnode.elm）插入到指定的父元素（parentElm）中，
            insert(parentElm, vnode.elm, refElm);
        }else{
            // 如果没有标签 比如文本类型
            vnode.elm = nodeOps.createTextNode(vnode.text);
            insert(parentElm, vnode.elm, refElm);
        }   

    }  
    
    function insert(parent,elm,ref){
        if (isDef(parent)) {
            //如果有相邻节点
            if(isDef(ref)){
                if (nodeOps.parentNode(ref) === parent) {
                    nodeOps.insertBefore(parent, elm, ref)
                }
            }else{
                nodeOps.appendChild(parent, elm);
            } 
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
            parentElm,
            nodeOps.nextSibling(oldElm)
        )
    }
}