import { isDef, isArray, isPrimitive, isUndef } from "@/my-vue/shared/util"
import VNode from "./vnode";

const hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
    return a.key === b.key && a.tag === b.tag;
}

export const emptyNode = new VNode('', {}, [])
export function createPatchFunction(backend) {

    let i, j
    const cbs = {}

    const { modules, nodeOps } = backend

    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = []
        for (j = 0; j < modules.length; ++j) {
            if (isDef(modules[j][hooks[i]])) {
                cbs[hooks[i]].push(modules[j][hooks[i]])
            }
        }
    }


    function emptyNodeAt(elm) {
        return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }

    function createChildren(vnode, children, insertedVnodeQueue) {
        //假设是字符串、数字类型等，我们将其直接挂载到vnode的真实元素下
        if (isPrimitive(vnode.text)) {
            nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text))
        } else if (isArray(children)) {
            for (let i = 0; i < children.length; ++i) {
                createElm(
                    children[i],
                    insertedVnodeQueue,
                    vnode.elm,
                    null
                )
            }
        }
    }

    function invokeCreateHooks(vnode) {
        for (let i = 0; i < cbs.create.length; ++i) {
            cbs.create[i](emptyNode, vnode)
        }
    }
    function createElm(vnode, insertedVnodeQueue, parentElm, refElm) {

        if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
            return
        }

        //获取 VNode 表示的标签名或组件名称。
        const tag = vnode.tag;
        //获取 VNode 子节点数组
        const children = vnode.children;
        //获取VNode的data数据
        const data = vnode.data;
        // 创建真实的 DOM 元素
        // 如果vnode有标签
        if (isDef(tag)) {
            vnode.elm = nodeOps.createElement(tag, vnode);
            //递归地为当前 VNode 的所有子节点创建和挂载对应的 DOM 元素
            createChildren(vnode, children);

            if (isDef(data)) {
                invokeCreateHooks(vnode, insertedVnodeQueue)
            }
            //将新创建的 DOM 元素（vnode.elm）插入到指定的父元素（parentElm）中，
            insert(parentElm, vnode.elm, refElm);
        } else {
            // 如果没有标签 比如文本类型
            vnode.elm = nodeOps.createTextNode(vnode.text);
            insert(parentElm, vnode.elm, refElm);
        }

    }

    function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
        let i = vnode.data
        if (isDef(i)) {
            const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
            if (isDef((i = i.hook)) && isDef((i = i.init))) {
                i(vnode, false /* hydrating */)
            }
            // after calling the init hook, if the vnode is a child component
            // it should've created a child instance and mounted it. the child
            // component also has set the placeholder vnode's elm.
            // in that case we can just return the element and be done.
            if (isDef(vnode.componentInstance)) {
                initComponent(vnode, insertedVnodeQueue)
                insert(parentElm, vnode.elm, refElm);
                return true
            }
        }
    }

    function initComponent(vnode, insertedVnodeQueue) {
        // 执行_update时__patch__方法 返回的
        vnode.elm = vnode.componentInstance.$el;
    }

    function insert(parent, elm, ref) {
        if (isDef(parent)) {
            //如果有相邻节点
            if (isDef(ref)) {
                if (nodeOps.parentNode(ref) === parent) {
                    nodeOps.insertBefore(parent, elm, ref)
                }
            } else {
                nodeOps.appendChild(parent, elm);
            }
        }
    }

    function removeVnodes(vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            const ch = vnodes[startIdx];
            if (isDef(ch)) {
                if (isDef(ch.tag)) {
                    removeAndInvokeRemoveHook(ch);
                }
            }
        }
    }

    function removeAndInvokeRemoveHook(vnode) {
        removeNode(vnode.elm)
    }


    function removeNode(el) {
        const parent = nodeOps.parentNode(el)
        // element may have already been removed due to v-html / v-text
        if (isDef(parent)) {
            nodeOps.removeChild(parent, el)
        }
    }

    function updateChildren(
        parentELm,
        oldCh,
        newCh,
    ){
        let oldStartIdx = 0
        let oldStartVnode = oldCh[0]
        let oldEndIdx = oldCh.length - 1
        let oldEndVnode = oldCh[oldEndIdx]
        let newStartIdx = 0
        let newEndIdx = newCh.length - 1
        let newStartVnode = newCh[0]
        let newEndVnode = newCh[newEndIdx]
        
        let oldKeyToIdx, idxInOld, vnodeToMove, refElm
    }

    function patchVnode(
        oldVnode,
        vnode
    ){
        // 将老的elm赋值给新的elm
        const elm = (vnode.elm = oldVnode.elm);
        // 老的children
        const oldCh = oldVnode.children
        // 新的children
        const ch = vnode.children
        // 如果不是文本vnode
        if(isUndef(vnode.text)){
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch){
                    updateChildren(elm, oldCh, ch)
                }
            }
        }
    }

    return function patch(oldVnode, vnode) {
        console.log("===patch===>", oldVnode, vnode);
        let isInitialPatch = false;
        const insertedVnodeQueue = []

        if (isUndef(oldVnode)) {
            isInitialPatch = true;
            createElm(vnode, insertedVnodeQueue);
        } else {
            //判断是否是一个真实节点，nodeType是DOM元素的一个属性，它表示节点的类型 
            const isRealElement = isDef(oldVnode.nodeType);
            //如果是相同节点，调用patchNpde
            if (!isRealElement && sameVnode(oldVnode, vnode)) {
                patchVnode(oldVnode, vnode, insertedVnodeQueue)
            } else {
                if (isRealElement) {
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
                );

                //如果存在父节点 移除旧节点
                if (isDef(parentElm)) {
                    removeVnodes([oldVnode], 0, 0);
                }
            }

        }
        return vnode.elm;
    }
}