import mountElement from "./mountElement"
import updateComponent from "./updateComponent"
/**
 * 组件更新diff方法
 * @param {*} vDOM
 * @param {*} oldDOM
 * @param {*} oldComponent
 * @param {*} container
 */
export default function diffComponent(vDOM, oldDOM, oldComponent, container) {
  if (isSameComponent(vDOM, oldComponent)) {
    console.log('相同组件-----')
    updateComponent(vDOM, oldDOM, oldComponent, container)
  } else {
    console.log('不同组件-----')
    mountElement(vDOM, container, oldDOM)
  }
}

/**
 * 判断是否是相同的组件
 * @param {*} vDOM
 * @param {*} oldComponent
 */
function isSameComponent(vDOM, oldComponent) {
  // 组件是否相同的条件就是 vDOM的type的构造函数和老组件的构造函数是否为同一个
  return vDOM && vDOM.type === oldComponent.constructor
}