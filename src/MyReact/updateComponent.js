import diff from "./diff"

/**
 * 组件更新操作
 * @param {*} vDOM
 * @param {*} oldDOM
 * @param {*} oldComponent
 * @param {*} container
 */
export default function updateComponent(vDOM, oldDOM, oldComponent, container) {
  // 这里需要调用生命周期函数, 组件是否需要更新
  oldComponent.componentWillReceiveProps(vDOM.props)
  if (oldComponent.shouldComponentUpdate(vDOM.props)) {
    // 未更新前的props
    let prevProps = oldComponent.props
    oldComponent.componentWillUpdate(vDOM.props)
    // 组件更新 props
    oldComponent.updateProps(vDOM.props) // 更新 props
    let nextVDOM = oldComponent.render() // 生成新的vDOM
    // 更新component组件的实例对象
    nextVDOM.component = oldComponent
    // 对比
    diff(nextVDOM, container, oldDOM)
    // 组件更新完成
    oldComponent.componentDidUpdate(prevProps)
  }
}