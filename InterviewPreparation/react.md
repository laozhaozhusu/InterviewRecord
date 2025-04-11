# React 中, setState 是同步还是异步

同步:

- 首先在legacy模式下
- 在执行上下文为空的时候去调用setState
可以使用异步调用如setTimeout, Promise, MessageChannel等
可以监听原生事件, 注意不是合成事件, 在原生事件的回调函数中执行 setState 就是同步的

异步:

- 如果是合成事件中的回调, executionContext |= DiscreteEventContext, 所以不会进入, 最终表现出异步
- concurrent 模式下都为异步

# React 算法之调和算法

- 第一次循环: 比较公共序列
从左到右逐一遍历, 遇到一个无法复用的节点则退出循环.
- 第二次循环: 比较非公共序列
在第一次循环的基础上, 如果oldFiber队列遍历完了, 证明newChildren队列中剩余的对象全部都是新增.
此时继续遍历剩余的newChildren队列即可, 没有额外的diff比较.
在第一次循环的基础上, 如果oldFiber队列没有遍历完, 需要将oldFiber队列中剩余的对象都添加到一个map集合中, 以oldFiber.key作为键.
此时则在遍历剩余的newChildren队列时, 需要用newChild.key到map集合中进行查找, 如果匹配上了, 就将oldFiber从map中取出来, 同newChild进行diff比较.
- 清理工作
在第二次循环结束后, 如果map集合中还有剩余的oldFiber,则可以证明这些oldFiber都是被删除的节点, 需要打上删除标记.

# class 组件生命周期有哪些?

- ✅ 一、挂载阶段（Mounting）
    constructor：初始化 state、绑定方法

    getDerivedStateFromProps：根据 props 更新 state（少用）

    render：渲染 UI

    componentDidMount：组件挂载完成，适合发请求、操作 DOM

- 🔁 二、更新阶段（Updating）
    getDerivedStateFromProps：同样会调用

    shouldComponentUpdate：是否更新（性能优化）

    render：重新渲染

    getSnapshotBeforeUpdate：获取更新前信息（如滚动位置）

    componentDidUpdate：更新后执行，适合处理副作用

- ❌ 三、卸载阶段（Unmounting）
    componentWillUnmount：清理操作，如取消定时器、订阅

- ⚠️ 四、错误处理（Error Handling）
    getDerivedStateFromError：更新 UI，显示错误页

# 重复调用 setState 会发生什么?
- React 会合并多次 setState（批处理更新）  
    多次调用 setState，React 会合并更新，触发一次渲染。

    在同一个事件循环中，多次 setState 并不会立刻更新 this.state。
- 使用函数式更新可避免问题（推荐写法）
- React 18 起，异步更新也会批处理
    比如在 setTimeout、Promise 中的多个 setState，也会合并更新。

    React 18 前，异步代码里不会自动合并。

# 什么是 Fiber 架构？
- Fiber 是 React 16 引入的一种新的协调引擎（reconciliation engine），用于实现可中断、可分段的渲染，提高性能和响应性。
- React 15 及之前的协调是递归同步的，一旦开始渲染就不能中断，容易导致卡顿。
- 随着 React 应用越来越复杂，需要更灵活的调度机制，于是引入 Fiber。

# 调和算法具体干什么的?
- 用来比较新旧虚拟 DOM 的过程，目的是找出需要更新的部分，尽可能复用已有的 DOM 节点，从而高效更新 UI。

# useState() 如何实现数据持久化？

- useState 本身不具备持久化功能，但可以结合 localStorage 和 useEffect 实现数据在刷新后的持久保存。
- 持久化还可以用状态管理库（如 Zustand、Redux Persist）实现跨页持久。

# useEffect() 会有内存泄漏吗？
- useEffect() 本身不会导致内存泄漏，但如果在 effect 中启动了异步任务、订阅、定时器等而没有清理，就可能产生内存泄漏。

# useEffect(function, deps) 中依赖项是如何对比的？
- React 使用的是浅比较来判断依赖项是否发生变化。
- 引用类型（对象/数组/函数）每次都是新值，容易导致 useEffect 频繁触发。  
    使用 useMemo 缓存对象/数组  
    使用 useCallback 缓存函数   
- 基本类型（number、string、boolean）比较的是值，不会重复触发。
- React 官方不建议省略依赖数组或手动控制依赖项，推荐使用 eslint-plugin-react-hooks 自动检测依赖正确性。

# react里中onclick绑定后的工作原理
- React 使用的是合成事件（Synthetic Event）系统，不是直接绑定在 DOM 上，而是通过事件委托机制，在最外层（如 root 容器）统一处理。不会在每个 DOM 节点上单独绑定事件，而是将所有事件统一绑定在容器上，靠事件冒泡 + 匹配 Fiber 节点来触发响应。

# React 有 Fiber，为什么 Vue 不需要 Fiber？
- 因为 React 缺乏响应式系统，需要 Fiber 来解决可中断更新的问题；
- 而 Vue 有完善的响应式机制，更新本身粒度足够小，因此不需要 Fiber 架构。


