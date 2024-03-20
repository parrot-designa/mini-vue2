
import { namespaceMap } from '../util/index';

export function createElement(tagName) {
    const elm = document.createElement(tagName);
    return elm
}

export function createTextNode(text){
    return document.createTextNode(text)
}

export function createElementNS(namespace, tagName) {
    return document.createElementNS(namespaceMap[namespace], tagName)
}

export function createComment(text){
    return document.createComment(text)
}

export function insertBefore(
    parentNode,
    newNode,
    referenceNode
){
    parentNode.insertBefore(newNode, referenceNode)
}
  
export function removeChild(node, child) {
    node.removeChild(child)
}

export function appendChild(node, child) {
    node.appendChild(child)
}

export function parentNode(node) {
    return node.parentNode
}

export function nextSibling(node) {
    return node.nextSibling
}

export function tagName(node) {
    return node.tagName
}

export function setTextContent(node, text) {
    node.textContent = text
}

export function setStyleScope(node, scopeId) {
    node.setAttribute(scopeId, '')
}
  