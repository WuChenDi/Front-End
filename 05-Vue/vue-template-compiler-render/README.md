# Vue 模板编译

了解模板编译，可以在 vue 项目使用 render 函数编写代码

项目案例可查看 [coding](./index.js)

## todolist

- 插值
- 表达式
- 属性和动态属性
- 条件
- 循环
- 事件
- 指令
  - v-show
  - v-loading
  - v-model
- render

## vue template explorer

### Vue2

https://v2.template-explorer.vuejs.org

tips: 由于目前 Vue2 使用的是最新版本 **https://unpkg.com/vue@latest**

方式1: 可以手动拉取 [vue-template-explorer](https://github.com/vuejs/vue-template-explorer) 仓库本地运行, 修改指定版本用于操作

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="shortcut icon" href="<%= webpackConfig.output.publicPath %>favicon.ico">
    <title>Vue Template Explorer</title>
    <script src="https://unpkg.com/vue@2.7.14"></script>
    <script src="https://unpkg.com/vue-template-compiler@latest/browser.js"></script>
    <script src="https://unpkg.com/vue-server-renderer@latest/basic.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

方式2: 使用 [XSwitch](https://chrome.google.com/webstore/detail/xswitch/idkjhjggpffolpidfkikidcokdkdaogg) 代理修改

  ``` json
  {
    "proxy": [
      [
        "https://unpkg.com/vue@3.2.47",
        "https://unpkg.com/vue@2.7.14",
      ]
    ]
  }
  ```

### Vue3

https://template-explorer.vuejs.org
