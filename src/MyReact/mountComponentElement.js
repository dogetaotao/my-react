import isFunction from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

/**
 * 渲染组件元素
 * @param {*} vDOM
 * @param {*} container
 * @param {*} oldDOM
 */
export default function mountComponentElement (vDOM, container, oldDOM) {
  let nextElementVDOM = null
  let component = null // 用于保存当前vDOM的component属性,将使用他处理ref属性
  // 区分class组件, 以及函数组件,如果vDOM中 有render方法,那么就是class组件,否则就是函数组件
  if (isFunctionComponent(vDOM)) {
    // 这里生成的可能是一个包含组件的函数式组件
    nextElementVDOM = buildFunctionComponent(vDOM)
  } else {
    nextElementVDOM = buildClassComponent(vDOM)
    component = nextElementVDOM.component
  }
  // 如果这个创建的elemnt还是个函数,那么就继续处理
  if (isFunction(nextElementVDOM)) {
    mountComponentElement(nextElementVDOM, container, oldDOM)
  } else {
    // 如果不是函数,那么就是普通的Dom元素了,直接进行渲染
    mountNativeElement(nextElementVDOM, container, oldDOM)
  }

  if (component) {
    if (component?.props?.ref) {
      // 执行ref中的回调函数,并将该组件传递给ref
      component.props.ref(component)
    }
  }

}
/**
 * build函数式组件,函数式组件直接执行,执行过后就是生成的vdom
 * @param {*} vDOM
 * @returns
 */
function buildFunctionComponent(vDOM) {
  return vDOM.type(vDOM.props || {})
}


/**
 * build类组件, 需要对其进行实例化,然后手动的调用render方法
 * @param {*} vDOM
 * @returns
 */
function buildClassComponent(vDOM) {
  const component = new vDOM.type(vDOM.props || {})
  const nextVirtualDOM = component.render()
  nextVirtualDOM.component = component // 将component实例保存在改virtualDOM上
  return nextVirtualDOM
}