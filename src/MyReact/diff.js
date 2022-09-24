import createDOMElement from "./createDOMElement"
import mountElement from "./mountElement"
import updateNodeElement from "./updateNodeElement"
import updateTextNode from "./updateTextNode"
import unmountNode from "./unmountNode"
import diffComponent from "./diffComponent"

/**
 * diff算方法
 * @param {*} vDOM
 * @param {*} container
 * @param {*} oldDOM
 */
export default function diff(vDOM, container, oldDOM = container.firstChild) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component
  // oldDOM 实际上就是我们即将更新的dom,即root下 第一个dom元素, 或者其他子元素的,外层父元素.
  // 判断oldDOM是否存在
  if (!oldDOM) {
    // 创建元素
    mountElement(vDOM, container)
  } else if (vDOM.type !== oldVirtualDOM.type && typeof vDOM.type !== 'function') {
    // 处理节点类型不相同的情况, 同时还需要确认,这个类型不能是函数,因为函数组件的话需要另外的处理
    // 节点类型不同的情况,就可以直接执行替换操作就行.
    const newElement = createDOMElement(vDOM)
    // 替换,使用父节点进行替换
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  } else if (typeof vDOM.type === 'function') {
    diffComponent(vDOM, oldDOM, oldComponent, container)
  } else if (oldVirtualDOM && vDOM.type === oldVirtualDOM.type) {
    // 处理节点类型相同的情况
    if (vDOM.type === 'text') {
      // 更新文本节点, 当前vDOM, 旧的vDOM, 以及旧节点
      updateTextNode(vDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素属性
      updateNodeElement(oldDOM, vDOM, oldVirtualDOM)
    }

    // 1. 处理key属性的子元素
    let keyedElements = {} // 用于保存含有Key的元素,通过key值保存起来
    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      let domElement = oldDOM.childNodes[i]
      // 元素节点 才会有key值
      if (domElement.nodeType === 1) {
        let key = domElement.getAttribute('key')
        if (key) {
          keyedElements[key] = domElement // 保存当前key对应的元素
        }
      }
    }

    let hasNoKey = Object.keys(keyedElements).length === 0
    // 判断是否含有key属性,如果没有,那么就使用索引的方式进行更新
    if (hasNoKey) {
      // 递归调用diff, 继续往下对比更新
      vDOM.children.forEach((child, i) => {
        diff(child, oldDOM, oldDOM.childNodes[i])
      })
    } else {
      // 如果有Key属性,那么就是用Key属性的方式进行更新
      // 2. 遍历vDOM的子元素, 获取子元素的key属性
      vDOM.children.forEach((child, i) => {
        let key = child.props.key
        if (key) {
          let domElement = keyedElements[key]
          if (domElement) {
            // 如果dom元素存在, 那么不需要进行更新.依次往后比较, 如果遇到不同的节点,那么将其插入到oldDOM之前.
            if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
            }
          } else {
            // dom不存在,表明他是 新增元素, 直接进行渲染, 渲染当前child的元素到oldDOM上面
            mountElement(child, oldDOM, oldDOM.childNodes[i])
          }
        }
      })
    }

    // 删除节点, 索引方式, key的方式
    // 父节点相同,子节点会依次进行对比, 如果当前子节点的text发生了改变,那么会直接进行替换
    // ,直到最后一个节点遍历完成. 这样,旧节点就会多出剩余的节点,这些节点都是需要被删除的.
    const oldChildNodes = oldDOM.childNodes
    // 判断节点数量, 如果旧节点的数量大于新节点的数量,那么就表明有节点需要被删除
    if (oldChildNodes.length > vDOM.children.length) {
      if (hasNoKey) {
        for (let i = oldChildNodes.length; i > vDOM.children.length - 1; i--) {
          unmountNode(oldChildNodes[i])
        }
      } else {
        // 通过Key属性去删除. 遍历旧节点, 通过对比旧节点的Key与新节点中的key判断他是否应该被删除
        for (let i = 0; i < oldChildNodes.length; i++) {
          let oldChild = oldChildNodes[i]
          let oldChildKey = oldChild._virtualDOM.props.key
          let found = false // 默认未找到被删除的元素
          // 通过对比可key,可以找到
          for (let n = 0; n < vDOM.children.length; n++) {
            if (oldChildKey === vDOM.children[n].props.key) {
              found = true // 找到了key,说明这个不能被删除,然后终止循环,进入下一轮查找
              break
            }
          }
          // 如果没有在新的节点中找到元素,那么就需要将其移除
          if (!found) {
            unmountNode(oldChild)
          }
        }
      }
    }

  }
}