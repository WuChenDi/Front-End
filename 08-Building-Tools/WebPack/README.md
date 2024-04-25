## Module（模块）
对于webpack，模块不仅仅是javascript模块，它包括了任何类型的源文件，不管是图片、字体、json文件都是一个个模块。Webpack支持以下的方式引用模块：

- ES2015 import 方法
- CommonJs require() 方法
- AMD define 和 require 语法
- css/sass/less文件中的 @import 语法
- url(...) 和　< img src=...> 中的图片路径

## Entry（入口）
绘制依赖关系图的起始文件被称为entry。默认的entry为 ./src/index.js，或者我们可以在配置文件中配置。
<!-- entry可以为一个也可以为多个。 -->

## Output（出口）
有了入口，对应的就有出口。顾名思义，出口就是webpack打包完成的输出，output定义了输出的路径和文件名称。Webpack的默认的输出路径为 ./dist/main.js。
<!-- 同样，我们可以在配置文件中配置output： -->

## Loader（加载器）
Webpack自身只支持加载js和json模块，而webpack的理念是让所有的文件都能被引用和加载并生成依赖关系图，所以loader出场了。Loader能让webpack能够去处理其他类型的文件（比如图片、字体文件、xml）。
<!-- 我们可以在配置文件中这样定义一个loader： -->

## Plugin（插件）
Plugin和loader是两个比较混淆和模糊的概念。Loader是用来转换和加载特定类型的文件，所以loader的执行层面是单个的源文件。而plugin可以实现的功能更强大，plugin可以监听webpack处理过程中的关键事件，深度集成进webpack的编译器，可以说plugin的执行层面是整个构建过程。Plugin系统是构成webpack的主干，webpack自身也基于plugin系统搭建，webpack有丰富的内置插件和外部插件，并且允许用户自定义插件。