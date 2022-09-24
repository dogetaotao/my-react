/**
 * 更新文本节点
 * @param {*} vDOM 当前vdom
 * @param {*} oldVirtualDOM 旧的vdom
 * @param {*} oldDOM 旧的节点
 */
export default function updateTextNode(vDOM, oldVirtualDOM, oldDOM) {
  if (vDOM.props.textContent !== oldVirtualDOM.props.textContent) {
    oldDOM.textContent = vDOM.props.textContent
    oldDOM._virtualDOM = vDOM
  }
}