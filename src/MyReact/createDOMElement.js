import mountElement from "./mountElement"
import updateNodeElement from "./updateNodeElement"
/**
 * 创建虚拟dom
 * @param {*} vDOM
 * @returns
 */
export default function createDOMElement(vDOM) {
  let newElement = null

  // 1. 渲染文本节点
  if (vDOM.type === 'text') {
    newElement = document.createTextNode(vDOM.props.textContent)
  } else {
    // 2.渲染元素节点
    newElement = document.createElement(vDOM.type)
    // 将props保存在节点上, 事件, data-set等等
    updateNodeElement(newElement, vDOM)
  }
  newElement._virtualDOM = vDOM
  // 以上步骤仅仅只是创建了根节点,还需要递归创建子节点
  vDOM.children.forEach(child => {
    // 将其放置在父节点上, 由于不确定当前子节点是组件还是普通vDOM
    mountElement(child, newElement)
  })
  // 将newElement传递给ref
  if (vDOM?.props?.ref) {
    vDOM.props.ref(newElement)
  }

  return newElement
}