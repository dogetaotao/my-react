
/**
 * 将jsx转换为VDom
 * @param {*} type
 * @param {*} props
 * @param  {...any} children 当前节点 <p>test</p> test就是children
 * @returns
 */
export default function createElement(type, props, ...children) {
  // 1.循环children对象进行对象转换,如果是对象,那么在调用一次createElement方法,将其转换为虚拟dom,否则直接返回,因为他就是普通节点.
  const childrenElements = [].concat(...children).reduce((result, child) => {
    // 2.节点中还有表达式, 不能渲染 null节点 boolean类型的节点
    if (child !== true && child !== false && child !== null) {
      if (child instanceof Object) {
        result.push(child)
      } else {
        // 如果他是文本节点,则直接转换为为本节点
        result.push(createElement("text", { textContent: child }))
      }
    }
    return result
  }, [])
  // 3. props 可以访问children节点,
  return {
    type,
    props: Object.assign({ children: childrenElements }, props),
    children: childrenElements
  }
}