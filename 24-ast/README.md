# Tiny Compiler

- 一个极小极小编译器。
- 用于理解与展示编译器的核心原理示例。
- 将 Lisp 风格语法编译为 JavaScript 语法。

## 示例

```javascript
// 输入
(add 2 (subtract 4 2))

// 输出
add(2, subtract(4, 2));
```

## 编译流程

```
源代码 → 词法分析 → 语法分析 → AST 转换 → 代码生成 → 目标代码
        Tokenizer  Parser   Transformer  CodeGen
```

## 核心模块

### Tokenizer - 词法分析器

将字符串分解为 token 流

```javascript
'(add 2 3)' → [
  { type: 'paren', value: '(' },
  { type: 'name', value: 'add' },
  { type: 'number', value: '2' },
  { type: 'number', value: '3' },
  { type: 'paren', value: ')' }
]
```

### Parser - 语法分析器

构建抽象语法树（AST）

```javascript
{
  type: 'Program',
  body: [{
    type: 'CallExpression',
    name: 'add',
    params: [
      { type: 'NumberLiteral', value: '2' },
      { type: 'NumberLiteral', value: '3' }
    ]
  }]
}
```

### Transformer - AST 转换器

Lisp 风格 → C 风格结构转换

```javascript
// 添加 Identifier、ExpressionStatement 节点
CallExpression { name: 'add' }
  ↓
CallExpression {
  callee: { type: 'Identifier', name: 'add' },
  arguments: [...]
}
```

### Code Generator - 代码生成器

递归遍历 AST，生成目标代码

## 快速开始

```javascript
import { compiler } from './index.js'

const code = compiler('(multiply 2 (add 3 4))')
console.log(code) // multiply(2, add(3, 4));
```

### 单独使用各模块

```javascript
import { tokenizer, parser, transformer, codeGenerator } from './index.js'

const tokens = tokenizer('(add 2 3)')
const ast = parser(tokens)
const newAst = transformer(ast)
const output = codeGenerator(newAst)
```

## 运行测试

```bash
npm run test
```

## 支持的语法

| 类型 | 语法 | 示例 |
|------|------|------|
| 数字 | `42` | `(add 1 2)` |
| 字符串 | `"text"` | `(log "hello")` |
| 函数调用 | `(fn arg1 arg2)` | `(subtract 10 5)` |
| 嵌套调用 | `(fn1 (fn2 x))` | `(add 2 (multiply 3 4))` |

## 技术亮点

- **访问者模式** - 解耦遍历与转换逻辑
- **递归下降解析** - 优雅处理嵌套结构
- **上下文传递** - 通过 `_context` 实现父子节点通信
- **函数式编程** - 无副作用的纯函数设计

## Compiler Pipeline

```
Input String
    ↓
Tokenizer (词法分析)
    ↓
Token Array
    ↓
Parser (语法分析)
    ↓
Original AST
    ↓
Traverser + Transformer (转换)
    ↓
New AST
    ↓
Code Generator (代码生成)
    ↓
Output String

```

## 扩展思路

- 添加运算符支持：`(+ 2 3)` → `2 + 3`
- 实现变量声明：`(var x 10)`
- 支持条件语句：`(if condition then else)`
- 添加函数定义：`(defn name (args) body)`
- 实现类型检查与静态分析
- 优化：常量折叠、死代码消除

## 学习资源

- [The Super Tiny Compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)
- [Crafting Interpreters](https://craftinginterpreters.com/)
- [Let's Build a Compiler](https://compilers.iecc.com/crenshaw/)
