# Tiny Compiler

一个简洁的编译器实现，将 Lisp 风格语法转换为 C 风格语法。

## 功能

将 `(add 2 (subtract 4 2))` 编译为 `add(2, subtract(4, 2));`

## 架构

```
Input → Tokenizer → Parser → Transformer → Code Generator → Output
```

### 1. Tokenizer (词法分析)

- 将源码拆分为 tokens
- 识别：括号、数字、字符串、标识符

### 2. Parser (语法分析)

- 生成 AST (抽象语法树)
- 节点类型：`Program`, `CallExpression`, `NumberLiteral`, `StringLiteral`

### 3. Transformer (转换)

- 使用 Traverser 遍历 AST
- 将 Lisp 风格 AST 转换为 C 风格 AST
- 添加 `Identifier` 和 `ExpressionStatement` 节点

### 4. Code Generator (代码生成)

- 递归遍历新 AST
- 生成目标代码字符串

## 使用

```javascript
import { compiler } from './index.js'

const input = '(add 2 (subtract 4 2))'
const output = compiler(input)
// => "add(2, subtract(4, 2));"
```

## 测试

```bash
npm run test
```

## 支持的语法

- 数字：`42`
- 字符串：`"hello"`
- 函数调用：`(functionName arg1 arg2)`
- 嵌套调用：`(add 2 (subtract 4 2))`
