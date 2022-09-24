import diff from "./diff"
/**
 * react render方法, 虚拟dom转换为真实dom
 * @param {*} vdom
 * @param {*} id
 */
export default function render(vDOM, container, oldDOM) {
  // diff算法
  diff(vDOM, container, oldDOM)
}