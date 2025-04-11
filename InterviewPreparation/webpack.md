# 有哪些常见的 Loader 和 Plugin？
- Loader:

    babel-loader：将ES6+的代码转换成ES5的代码。
    css-loader：解析CSS文件，并处理CSS中的依赖关系。
    style-loader：将CSS代码注入到HTML文档中。
    file-loader：解析文件路径，将文件赋值到输出目录，并返回文件路径。
    url-loader：类似于file-loader，但是可以将小于指定大小的文件转成base64编码的Data URL格式
    sass-loader：将Sass文件编译成CSS文件。
    less-loader：将Less文件编译成CSS文件。
    postcss-loader：自动添加CSS前缀，优化CSS代码等。
    vue-loader：将Vue单文件组件编译成JavaScript代码。

- Plugin:

    HtmlWebpackPlugin：生成HTML文件，并自动将打包后的javaScript和CSS文件引入到HTML文件中。
    CleanWebpackPlugin：清除输出目录。
    ExtractTextWebpackPlugin：将CSS代码提取到单独的CSS文件中。
    DefinePlugin：定义全局变量。
    UglifyJsWebpackPlugin：压缩JavaScript代码。
    HotModuleReplacementPlugin：热模块替换，用于在开发环境下实现热更新。
    MiniCssExtractPlugin：与ExtractTextWebpackPlugin类似，将CSS代码提取到单独的CSS文件中。
    BundleAnalyzerPlugin：分析打包后的文件大小和依赖关系。

# Loader和Plugin的区别
- 功能不同：
    Loader本质是一个函数，它是一个转换器。webpack只能解析原生js文件，对于其他类型文件就需要loade进行转换。  

    Plugin它是一个插件，用于增强webpack功能。webpack在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果 。
- 用法不同：
    Loader的配置是在module.rules下进行。类型为数组，每⼀项都是⼀个 Object ，⾥⾯描述了对于什么类型的⽂件（ test ），使⽤什么加载( loader )和使⽤的参数（ options ） 。  

    Plugin的配置在plugins下。类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。


