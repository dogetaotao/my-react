export default function updateNodeElement (newElement, vDOM, oldVirtualDOM = {}) {
  const newProps = vDOM.props || {}
  const oldProps = oldVirtualDOM.props || {}
  // 遍历vdom上的key,获取每个prop的值,
  Object.keys(newProps).forEach(key => {
    const newPropValue = newProps[key]
    const oldPropValue = oldProps[key]
    if (newPropValue !== oldPropValue) {
      // 如果是以on开头的,那么就认为是事件属性,因此我们需要给他注册一个事件 onClick -> click
      if (key.startsWith('on')) {
        // 由于事件都是驼峰命名的,因此,我们需要将其转换为小写,然后取最后事件名称
        const eventName = key.toLowerCase().slice(2)
        // 为当前元素添加事件处理函数
        newElement.addEventListener(eventName, newPropValue)
        // 移除旧的事件属性
        if (oldPropValue) {
          newElement.removeEventListener(eventName, oldPropValue)
        }
      } else if (key === 'value' || key === 'checked') {
        // input 中的属性值
        newElement[key] = newPropValue
      } else if (key !== 'children') {
        const attribute = key === 'className' ? 'class' : key // 区分class和其他属性
        // 抛开children属性, 因为这个是他的子节点, 这里需要区分className和其他属性
        newElement.setAttribute(attribute, newPropValue)
      }
    }
  })

  // 属性删除的情况, 通过遍历旧的属性, 相同的propName,如果新的属性值为空,说明这个属性就被删除了
  Object.keys(oldProps).forEach(propName => {
    const newPropValue = newProps[propName]
    const oldPropValue = oldProps[propName]
    // 新属性为空,说明,有属性被删除了
    if (!newPropValue) {
      if (propName.startsWith('on')) {
        const eventName = propName.toLowerCase().slice(2)
        newElement.removeEventListener(eventName, oldPropValue)
      } else if (propName !== 'children') {
        const attribute = propName === 'className' ? 'class' : key // 区分class和其他属性
        newElement.removeAttribute(attribute)
      }
    }
  })
}