
import MyReact from "./MyReact"
// 此处的MyReact会将jsx语法 通过调用MyReact.createElement(),然后返回我们所需要的VDOM
// 这个是在.babelrc配置的

const root = document.getElementById('root')
// const virtualDOM = (
//   <div className="container">
//     <h1 className="123">你好 Tiny React</h1>
//     <h2 data-test="test">(编码必杀技)</h2>
//     <div>
//       嵌套1 <div>嵌套 1.1</div>
//     </div>
//     <h3>(观察: 这个将会被改变)</h3>
//     {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
//     {2 == 2 && <div>2</div>}
//     <span>这是一段内容</span>
//     <button onClick={() => alert("你好")}>点击我</button>
//     <h3>这个将会被删除</h3>
//     2, 3
//     <input type="text" value="13" />
//   </div>
// )
// const modifiedDOM = (
//   <div className="container">
//     <h1 className="456">你好 Tiny React</h1>
//     <h2 data-test="test321">(编码必杀技)</h2>
//     <div>
//       嵌套1 <div>嵌套 1.1</div>
//     </div>
//     <h3>(观察: 这个将会被改变)</h3>
//     {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
//     {2 == 2 && <div>2</div>}
//     <span>这是一段内容</span>
//     <button onClick={() => alert("你好 5555555")}>点击我</button>
//     <input type="text" value="1312" />
//   </div>
// )
// //
// MyReact.render(virtualDOM, root)
// setTimeout(() => {
//   MyReact.render(modifiedDOM, root)
// }, 2000);
// console.log(virtualDOM)
function Hello() {
  return <div>Hello 123!</div>
}
function Heart(props) {
  return (<div>
    &hearts;
    {props.title}
    <Hello />
  </div>)
}

class Test extends MyReact.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>Test component</div>
  }
}

class MyClass extends MyReact.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '默认的title值'
    }
    this.changeTitle = this.changeTitle.bind(this)
    this.getRefs = this.getRefs.bind(this)
  }
  changeTitle() {
    this.setState({
      title: '我是改变后的title'
    })
  }
  getRefs() {
    console.log(this.input.value, 'value')
    console.log(this.heart)
  }
  componentWillReceiveProps() {console.log("componentWillReceiveProps")}
  componentWillUpdate() {console.log("componentWillUpdate")}
  componentDidUpdate() {console.log("componentDidUpdate")}
  render() {
    return <div>
      <p>age:{this.props.age}</p>
      <p>name: {this.props.name}</p>
      <p>gender: {this.props.gender}</p>
      <p>title: {this.state.title}</p>
      <input type="text" ref={input => this.input = input } />
      <button onClick={this.changeTitle}>改变title</button>
      <button onClick={this.getRefs}>获取input值</button>
      <Test ref={heart => this.heart = heart} />
    </div>
  }
}
class Wan extends MyReact.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <p>{this.props.title}</p>
      </div>
    )
  }
}

class UserPanel extends MyReact.Component {
  constructor(props) {
    super(props)
    this.state = {
      users:[
        {
          id: 1,
          name: '张三'
        },
        {
          id: 2,
          name: '李四'
        },
        {
          id: 3,
          name: '王五'
        },
        {
          id: 4,
          name: '赵六'
        },
      ]
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    const newState = JSON.parse(JSON.stringify(this.state))
    // newState.users.push(newState.users.shift()) // 测试位置交换
    // newState.users.splice(1, 0, { id:100, name: '李达' }) // 测试插入
    newState.users.pop() // 测试删除
    this.setState(newState)
  }
  render() {
    return (
      <div>
          <ul>
          {
            this.state.users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))
          }
        </ul>
        <button onClick={this.handleClick}>变换位置</button>
      </div>
    )
  }
}

MyReact.render(<UserPanel />, root)

// setTimeout(() => {
// MyReact.render(<MyClass age={19} name="ls" gender="woman" />, root)
// // MyReact.render(<Wan title="我是标题" />, root)

// }, 2000);