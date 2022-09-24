import diff from "./diff"

export default class Component {
  constructor(props) {
    this.props = props
  }
  /**
   * 子类调用setState方法, 改变子类的state,因此子类在调用setState的,这里的this就是子类的实例对象的this,所以可以更改state方法
   * 然后,状态变化后,调用render方法, 重新执行子类的类组件的vDOM的更新. 然后在调用diff方法,进行当前vDOM的更新
   * @param {*} state
   */
  setState(state) {
    this.state = Object.assign({}, this.state, state)
    let vDOM = this.render() // 调用render方法, 获取最新的vDOM. 与旧组件进行对比,然后diff
    // 在创建类组件的时候,需要我们将类组件的实例保存下来,然后在适当的时候,调用setDOM方法,就能够将当前的dom设置到这个组件的实例上来
    let oldDOM = this.getDom()
    let container = oldDOM.parentNode
    diff(vDOM, container, oldDOM)
  }
  /**
   *
   * @param {*} dom
   */
  setDom(dom) {
    this._dom = dom
  }
  getDom() {
    return this._dom
  }
  updateProps(props) {
    this.props = props
  }

  // 生命周期函数
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props && nextState !== this.state
  }

  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate() {}
  componentWillUnmount() {}

}