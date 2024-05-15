import { isDef, isArray, isPrimitive, isUndef } from "@/my-vue/shared/util"
import VNode from "./vnode";

const hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

/**
 * sameVnode 函数用于判断两个虚拟 DOM 节点（a 和 b）是否代表相同的节点，即它们在标识性和关键属性上相匹配。这种比较常用于虚拟 DOM 的更新过程中，以确定是否可以复用现有节点，而非创建新的节点，从而提高渲染效率。
 * @param {*} a 
 * @param {*} b 
 * @returns 
 * 函数通过以下条件判断节点 a 和 b 是否为同一节点：
 * 1. Key 相同：比较两个节点的 key 属性是否相等。key 是在列表项或动态组件中用于高效识别和重用元素的重要标识。
 * 2. AsyncFactory 相同：比较两个节点的 asyncFactory 属性是否指向同一个异步组件工厂。这确保了它们是同一种异步组件实例。
 * 3. 核心属性匹配：
 *    * Tag 相同：检查节点的 tag（元素类型或组件名称）是否一致。
 *    * IsComment 相同：判断两个节点是否均为注释节点（isComment 为真）或非注释节点。
 *    * Data 属性存在性一致：使用 isDef 函数比较两个节点的 data 属性是否存在。这表示它们是否都具有附加的数据对象。
 * 4. Input 类型相同：调用 sameInputType 函数比较两个节点（如果它们是输入元素）的输入类型是否相同。这有助于在表单控件更新时保持状态的一致性。
 * 5. 异步占位符情况：如果节点 a 是异步占位符（isAsyncPlaceholder 为真），且节点 b 的 asyncFactory 没有错误（isUndef(b.asyncFactory.error)），则认为它们是同一节点。这可能发生在异步组件加载过程中，允许暂时保留占位符节点直到实际组件加载完成。
 * 
 * 综上所述，sameVnode 函数通过一系列严格的条件判断，确保了两个虚拟 DOM 节点在关键标识、类型、数据状态、输入类型以及异步组件相关特性等方面完全一致，从而准确地识别出它们是否代表相同的节点。
 */
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
        let newStartVnode = newCh[0]
        let newEndIdx = newCh.length - 1 
        let newEndVnode = newCh[newEndIdx]
        
        let oldKeyToIdx, idxInOld, vnodeToMove, refElm
        while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx){
            // 如果是相同节点
            if(sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(
                    oldStartVnode,
                    newStartVnode,
                    [],
                )
                oldStartVnode = oldCh[++oldStartIdx]
                newStartVnode = newCh[++newStartIdx]
            }
        }
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
            // 如果有新旧children
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch){
                    updateChildren(elm, oldCh, ch)
                }
            }
        //如果是文本node，直接更新文本vnode 的文字
        }else if(oldVnode.text !== vnode.text){
            nodeOps.setTextContent(elm,vnode.text)
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
            //如果是相同节点，调用patchVnode
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