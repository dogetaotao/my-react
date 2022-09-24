import mountElement from "./mountElement"
import createDOMElement from "./createDOMElement"
import unmountNode from "./unmountNode"
/**
 * 渲染vdom到指定节点
 * @param {*} vDOM
 * @param {*} container
 */
export default function mountNativeElement(vDOM, container, oldDOM) {
  let newElement= createDOMElement(vDOM)
  if (oldDOM) {
    // 如果原来的dom存在,那么应该使用插入方法
    container.insertBefore(newElement, oldDOM)
  } else {
    container.appendChild(newElement)
  }

  // 更新之前,需要先将就节点进行删除,然后在进行 新节点的添加
  if (oldDOM) {
    unmountNode(oldDOM)
  }

  let component = vDOM.component
  // 类组件的setDom操作
  if (component) {
    component.setDom(newElement)
  }
}