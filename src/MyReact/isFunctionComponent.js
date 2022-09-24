import isFunction from "./isFunction"
/**
 * 判断当前vdom是否是函数式组件, 函数式组件的原型上是没有render方法的
 * @param {*} vDOM
 * @returns
 */
export default function isFunctionComponent(vDOM) {
  const type = vDOM.type
  return type && isFunction(vDOM) && !(type.prototype && type.prototype.render)
}