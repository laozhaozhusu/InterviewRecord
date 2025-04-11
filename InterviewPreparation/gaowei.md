# commomjs 与ES 6引入
模块化是为了实现代码的复用、隔离作用域、提升可维护性。JavaScript 早期并不支持模块，后来社区提出了 CommonJS，之后 ES6 官方标准推出了 ES Modules。
常见的两种模块规范是 CommonJS 和 ES Modules，它们的核心区别主要有这些：

语法不同：

CommonJS 用 require() 引入，用 module.exports 导出；

ES Modules 用 import/export，更接近现代语言规范。

加载机制：

CommonJS 是 同步加载，适合后端（如 Node.js）；

ES Modules 是 静态加载，编译阶段就确定依赖关系，适合前端，有利于打包优化，比如 Tree Shaking。

执行时机：

CommonJS 是运行时加载；

ES Modules 是编译时加载，模块是默认严格模式。


# 闭包的好处与坏处
好处： 数据私有化 维持状态 函数式编程常用技巧

坏处： 容易导致内存泄漏 调试困难 性能开销


# 事件循环 node环境与浏览器不一样
事件循环是 JavaScript 为了解决“单线程”中如何处理异步任务的一种机制，它负责协调执行栈、消息队列和微任务队列，让代码“看起来是异步执行”的。
先执行同步代码（主线程任务）
遇到异步代码（比如 setTimeout、fetch），会交给浏览器或 Node 处理，并继续执行主线程
异步代码处理好后，被“排队”等待执行（加入任务队列）
事件循环机制会不断检查是否主线程空了，一旦空了就把任务队列中的代码拿出来执行

JavaScript 是单线程语言，为了处理异步任务，引入了事件循环机制。它会先执行同步代码，然后依次处理微任务队列（如 Promise.then），最后才执行宏任务队列（如 setTimeout）。通过事件循环机制，JavaScript 实现了异步非阻塞的执行方式。

# requestIdeaCallback requestAnimationFrame
requestIdleCallback 是一个浏览器提供的异步 API，可以在浏览器空闲时执行非关键任务，从而提高页面响应性能。
requestAnimationFrame 是浏览器提供的 API，用于在下一次重绘之前执行回调，适合执行高性能动画或视觉更新操作。
React 早期 Fiber 架构确实用过 requestIdleCallback 实现可中断渲染，但由于兼容性和调度控制力不够，后来改为使用内部的 scheduler 调度器，彻底掌控渲染节奏和优先级。
# vue2 vue3的原理
Vue 2 使用 Object.defineProperty 实现响应式，组件写法是 Options API，架构比较集中。而 Vue 3 采用了更现代的 Proxy，实现了更强大、精准的响应式系统，并引入 Composition API 让逻辑复用更灵活。
同时在编译器、TypeScript 支持、渲染性能等方面做了大量优化，整个框架也实现了模块化，支持构建 Web、Native 和 SSR 等多端应用。

# react中子组件向父组件传递参数
回调函数、context、状态管理
# 地址一直空白
查看控制台错误日志，确定是否有 JavaScript 错误。

检查网络请求，确保所有文件（JS, CSS, 图片等）都加载成功。

查看浏览器源代码，确保 HTML 文件结构正确。

使用简单的调试输出（console.log()）来确认页面是否正确渲染。

检查前端框架相关配置，如路由、状态管理等。


# 访问很慢
减小首屏体积、按需加载、合理缓存
压缩 & 预处理
网络传输优化：Gzip、http2多路复用、CDN 加速
代码结构与加载策略：代码分割、资源懒加载 & 延迟加载、缓存策略

# HTTP1.1 与HTTP2.0对比
传输与格式： 文本协议   所有数据切分成二进制的帧（Frame），再按流（Stream）组织
并发与性能：并发瓶颈   多路复用
头部压缩
优先级与流量控制
服务器推送

# HTTP的缓存
强缓存（强制缓存）：客户端在缓存有效期内，不会向服务器发起请求，直接使用缓存。
Cache-Control、Expires
协商缓存（对比缓存）：客户端会向服务器发送请求，服务器根据请求头和资源的状态判断资源是否需要重新加载。

# React hooks为什么不能写在条件语句后面
React 要求 Hooks 必须在组件的顶层调用，是为了确保每次渲染时 Hooks 的调用顺序是一致的。这有助于 React 正确地维护和更新每个 Hook 对应的状态和副作用。因此，避免将 Hooks 放在条件语句、循环或嵌套函数中是非常重要的。
# hooks和普通函数有什么区别
hooks是一个闭包，缓存了状态
普通函数没有缓存状态

调用位置
与生命周期关系
状态管理	
副作用管理	

# Redux的原理
Redux 提供了一种集中管理应用状态的方式，通过单一数据源、不可变数据和纯函数来实现可预测的状态更新。通过 store、action 和 reducer 的组合，Redux 为开发者提供了一种强大且一致的工具来管理和调试状态。尽管 Redux 在大型应用中非常有效，但在小型应用中可能会显得过于复杂，因此在选择是否使用 Redux 时，需要根据应用的需求进行权衡。

# babel的原理
Babel 把 JS 源代码转换成 AST（抽象语法树），修改它，再生成新的代码。

# webpack与vite的区别
Webpack 是“打包为中心”，Vite 是“按需加载为中心”

Vite 开发阶段不打包，利用浏览器原生 ESM，启动快、HMR 快

Vite 用 esbuild 做开发编译，Rollup 做生产打包，更快更小

Webpack 插件生态更成熟，但配置更复杂

Vite 更适合现代前端开发，Webpack 在大型项目和老项目仍有优势

虽然 Vite 在现代开发中体验非常优秀，比如启动快、HMR 快、配置简单，但它在处理超大项目、插件生态兼容性、构建灵活性上还有一些不足，在实际迁移或选型时还是要结合项目情况具体分析。

# webpack优化性能
babel换成 swc 
固定不变的依赖打包成动态链接库
分析哪些第三方的业务包大换成轻量级的
分割包
上http2多路复用
上Gzip

Webpack 优化我一般从两个方向出发：构建速度优化 和 构建体积优化。构建速度方面，会用多进程 loader、开启缓存、精简 loader 范围等。构建产物方面，则使用 Tree Shaking、代码分包、压缩 JS/CSS、CDN 引入等方式。实际项目中结合 webpack-bundle-analyzer 做分析，能更精准地找到优化点。

# 发布订阅实现

# 手写一个promise

# 