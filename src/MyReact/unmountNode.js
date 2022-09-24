/**
 * 卸载节点
 *
 * @param {*} node
 */
export default function unmountNode(node) {
  const vDOM = node._virtualDOM
  // 1. 该节点为文本节点, 直接删除
  if (vDOM.type === 'text') {
    node.remove()
    return
  }
  // 2. 该节点是元素节点(是否由组件生成?)
  let component = vDOM.component
  if (component) {
    component.componentWillUnmount()
    // 调用声明周期函数
  }
  // 3. 清楚ref属性上的dom对象
  if (vDOM.props && vDOM.props.ref) {
    vDOM.props.ref(null)
  }
  // 4. 节点属性中是否有事件属性
  Object.keys(vDOM.props).forEach(propName => {
    if (propName.startsWith('on')) {
      const eventName = propName.toLowerCase().slice(2)
      const eventHandler = vDOM.props[propName]
      // 卸载事件
      node.removeEventListener(eventName, eventHandler)
    }
  })
  // 递归删除子节点
  if (node.childNodes.length) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const element = node.childNodes[i];
      unmountNode(element)
      i-- // 每删除一个,都需要将数量减少
    }
  }
  node.remove()
}