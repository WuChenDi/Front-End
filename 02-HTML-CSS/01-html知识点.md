# Html知识点

## 按默认分类
1. 块级元素block
2. 行内inline
3. 行内块元素 inline-block

    块级元素block
    1. 元素自己独占一行显示（块级元素有默认宽度)
    2. 可以设置宽度和高度
    3. 当两个块级元素发生嵌套关系的时候，子元素如果没有设置宽度，那么该子元素的宽度与父元素的宽度一致。
    4. 代表: div , h1 , p , ul , li...

    行内元素inline
    1. 元素自己独占一行显示（块级元素有默认宽度)
    2. 行内元素不能直接设置宽度和高度
    3. 元素的宽和高就是内容撑开的宽高
    4. 代表： span , a , strong , b , i , s , font...

    行内块元素 inline-block
    1. 所有元素都在一行上显示
    2. 可以设置宽度和高度
    3. 代表：   , input....

## 语义化的意义
1. 开发者更容易理解，减少差异化，方便团队开发和维护
2. 机器更容易理解结果（搜索爬虫、方便其他设备解析（读屏幕软件、盲人设备、移动设备））

## 写页面结构应该注意的
1. 尽可能少的使用没有语义的div和span元素
2. 块级元素和内联元素的嵌套一定要符合web标准，比如内联元素就是不能嵌套块级元素

## HTML XHML HTML5的关系
1. HTML属于SGML
2. XHML属于XML,是Html进行XML严格化的结果
3. HTML5简单点理解成：h5≈ html+CSS 3+js+API，减少对外部插件的需求（比如 Flash），更优秀的错误处理，更多取代脚本的标记

## HTML5新特性
1. 新的语义化元素：article 、footer 、header 、nav 、section
2. 表单增强，新的表单控件：calendar 、date 、time 、email 、url 、search
3. 新的API：音频(用于媒介回放的video和audio元素)、图形（绘图canvas元素）
4. 新的API：离线，通过创建 cache manifest 文件，创建应用程序缓存
5. 新的API：本地存储，localStorage-没有时间限制的数据存储，sessionStorage-session数据存储（关闭浏览器窗口数据删除）
6. 新的API：实时通讯，设备能力

## Doctype
1. document type definiton 文档类型定义是一系列的语法规则，用来定义xml和html的文件类型
2. 浏览器用它来判断文档类型，决定使用何种协议辣子解析，以及切换浏览器模式

## 盒模型
1. 盒模型的组成大家肯定都懂，由里向外content,padding,border,margin.
2. 盒模型是有两种标准的，一个是标准模型，一个是IE模型

    ### 标准模型
    1. 在标准模型中，盒模型的宽高只是内容（content）的宽高

    ### IE模型
    1. 盒模型的宽高是内容(content)+填充(padding)+边框(border)的总宽高

    ### css如何设置两种模型
    1. 标准模型 box-sizing:content-box;
    2. IE模型 box-sizing:border-box;

## JS获取宽高如何获取盒模型对应的宽高
1. dom.style.width/height
这种方式只能取到dom元素内联样式所设置的宽高，也就是说如果该节点的样式是在style标签中或外联的CSS文件中 设置的话，通过这种方法是获取不到dom的宽高的
2. dom.currentStyle.width/height
这种方式获取的是在页面渲染完成后的结果，就是说不管是哪种方式设置的样式，都能获取到，只有IE浏览器支持该方式
3. window.getComputedStyle(dom).width/height
这种方式的原理和2是一样的，这个可以兼容更多的浏览器，通用性好一些
4. dom.getBoundingClientRect().width/height
这种方式是根据元素在视窗中的绝对位置来获取宽高的
5. dom.offsetWidth/offsetHeight

## 边距重叠
1. 边距重叠是指两个或多个盒子(可能相邻也可能嵌套)的相邻边界(其间没有任何非空内容、补白、边框)重合在一起而形成一个单一边界

## BFC
1. 块级格式化上下文 (Block Fromatting Context)是按照块级盒子布局

    ### BFC的原理
    1. 内部的box会在垂直方向，一个接一个的放置
    2. 每个元素的margin box的左边，与包含块border box的左边相接触（对于从做往右的格式化，否则相反）
    3. box垂直方向的距离由margin决定，属于同一个bfc的两个相邻box的margin会发生重叠
    4. bfc的区域不会与浮动区域的box重叠
    5. bfc是一个页面上的独立的容器，外面的元素不会影响bfc里的元素，反过来，里面的也不会影响外面的
    6. 计算bfc高度的时候，浮动元素也会参与计算