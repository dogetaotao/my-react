import mountNativeElement from "./mountNativeElement"
import mountComponentElement from "./mountComponentElement"
import isFunction from "./isFunction"
/**
 * 挂载元素
 * @param {*} vDOM
 * @param {*} container
 */
export default function mountElement(vDOM, container, oldDOM) {
  // 此处需要区分原生dom元素还是组件,如何区分?
  if (isFunction(vDOM)) {
    mountComponentElement(vDOM, container, oldDOM)
  } else {
    mountNativeElement(vDOM, container, oldDOM)
  }
}