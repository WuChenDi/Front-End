# 介绍

将表格常用的功能进行了整合封装，能高效完成常规业务开发

## 使用

> 由于组件未全局注册，需要手动引入并且注册

```js
import TableBase from '@/components/TableBasePage';
```

## 基础表格配置

## 分页表格配置

## 添加顶部按钮配置

## 行操作按钮配置

## 其他功能

### API

#### 表格属性

| 参数              | 说明                                                             | 类型            | 默认值  |
| ----------------- | ---------------------------------------------------------------- | --------------- | ------- |
| data              | 表格数据                                                         | `Array<Object>` | `[]`    |
| columns           | 表格列,详见字段属性说明                                          | `Array<Object>` | `[]`    |
| buttons           | 表格上方的按钮，详见按钮字符说明                                 | `Array<Object>` | `[]`    |
| pagination        | 是否启用分页(显示条件还需 total 大于 10，相当于只有一页隐藏分页) | `Boolean`       | `false` |
| pageSize          | 分页后每页条数                                                   | `Number`        | `10`    |
| total             | 分页后数据总条数                                                 | `Number`        | `0`     |
| currentPage       | 分页后当前页码                                                   | `Number`        | `0`     |
| disabledTotal     | 禁止选中数量                                                     | `Number`        | `0`     |
| defaultSelectable | 是否显示复选框(表格默认)                                         | `Boolean`       | `false` |
| customselectable  | 自定义表格内复选框，在表格首列展示(自定义全选需求使用)           | `Boolean`       | `false` |
| selectable        | 表格是否显示复选框                                               | `Boolean`       | `true`  |
| sequence          | 表格前是否显示序号列                                             | `Boolean`       | `false` |
| rowKey            | 行唯一值，必须且对应数据唯一值                                   | `String`        | `id`    |

#### 表格事件

> _表格除了以下事件外，可以使用 element ui 表格组件的其他所有事件_

#### 表格方法

| 方法名             | 说明                       | 参数                           | 返回值            |
| ------------------ | -------------------------- | ------------------------------ | ----------------- |
| getSelectionRows   | 获取复选框选中的行         | -                              | `rows:Array<row>` |
| getCurrentRow      | 获取点击行选中的行         | -                              | `row:Object`      |
| setCurrentRow      | 单行选中时设置选中的行     | `row:Object`                   | -                 |
| toggleRowSelection | 启用复选后切换行的选中状态 | `row: Object, select: Boolean` | -                 |
| doLayout           | 重新布局表格               | -                              | -                 |

#### 内置插槽

| 插槽    | 说明                                 | 参数                                                    |
| ------- | ------------------------------------ | ------------------------------------------------------- |
| column  | 表格列插槽，可以自定义表格列渲染方式 | `{row,column,prop,cellValue,$index,field}`              |
| header  | 自定义表格表头显示方式               | `{label,prop,column, $index, field }`                   |
| button  | 自定义表头顶部按钮                   | `{button, selectedRow}` `selectedRow`为选中的表格行数据 |
| toolbar | 自定义顶部工具条                     | -                                                       |

#### 列属性

> _列属性除以下属性外，elementui 列其他属性均可使用_

| 参数      | 说明                                      | 类型                            | 默认值  |
| --------- | ----------------------------------------- | ------------------------------- | ------- |
| label     | 列名                                      | `String`                        | -       |
| prop      | 列属性                                    | `String`                        | -       |
| width     | 表头宽度                                  | `Number`                        | -       |
| sortable  | 是否排序列                                | `Boolean`                       | `false` |
| formatter | 不支持，请使用 render 函数自定义渲染      | `(row,column,cellValue):String` | -       |
| render    | render 自定义渲染函数                     | `(h, ctx): VNode`               | -       |
| nests     | 嵌套列                                    | `Array<Column>`                 | -       |
| events    | 单元格事件，见 elementui 单元格事件       | `Object<Event>`                 | -       |
| useSlot   | 是否在当前列使用插槽，插槽名称为 `column` | `Boolean`                       | `false` |
| hidden    | 是否隐藏当前列                            | `Boolean, Function`             | `false` |

#### 表头按钮属性

> _表头按钮除以下属性外，elementui 按钮其他属性均可使用_

| 参数  | 说明                          | 类型            | 默认值 |
| ----- | ----------------------------- | --------------- | ------ |
| id    | 按钮唯一标识，必填            | `String|Number` | -      |
| text  | 按钮显示文字                  | `String`        | -      |
| icon  | 按钮显示图标                  | `String`        | -      |
| click | 点击按钮事件,传入选中的行数据 | `(rows):void`   | -      |
