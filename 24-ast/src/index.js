'use strict'

/**
 * 词法分析器（Tokenizer）
 * 作用：将输入的字符串分解成一个个 token（词法单元）
 * 例如：'(add 2 3)' -> [{ type: 'paren', value: '(' }, { type: 'name', value: 'add' }, ...]
 * 
 * @param {string} input - 源代码字符串
 * @returns {Array} tokens - token 数组
 */
function tokenizer(input) {
  let current = 0        // 当前处理到的字符位置（指针）
  const tokens = []      // 存储所有解析出来的 token

  // 遍历输入字符串的每个字符
  while (current < input.length) {
    let char = input[current]

    // 识别左括号 '('
    if (char === '(') {
      tokens.push({
        type: 'paren',   // token 类型是括号
        value: '(',
      })
      current++          // 移动指针到下一个字符
      continue           // 跳过后续判断，继续下一轮循环
    }

    // 识别右括号 ')'
    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')',
      })
      current++
      continue
    }

    // 识别空白字符（空格、换行、制表符等）
    const WHITESPACE = /\s/
    if (WHITESPACE.test(char)) {
      current++          // 跳过空白字符，不生成 token
      continue
    }

    // 识别数字（例如：2, 42, 123）
    const NUMBERS = /[0-9]/
    if (NUMBERS.test(char)) {
      let value = ''     // 用于累积数字字符

      // 持续读取连续的数字字符
      while (NUMBERS.test(char)) {
        value += char
        char = input[++current]  // 先递增 current，再取字符
      }

      tokens.push({ type: 'number', value })
      continue
    }

    // 识别字符串（例如："hello"）
    if (char === '"') {
      let value = ''
      char = input[++current]  // 跳过开始的引号

      // 持续读取直到遇到结束引号
      while (char !== '"') {
        value += char
        char = input[++current]
      }

      char = input[++current]  // 跳过结束的引号
      tokens.push({ type: 'string', value })
      continue
    }

    // 识别标识符/函数名（例如：add, subtract, myFunction）
    const LETTERS = /[a-z]/i   // i 标志表示不区分大小写
    if (LETTERS.test(char)) {
      let value = ''

      // 持续读取连续的字母
      while (LETTERS.test(char)) {
        value += char
        char = input[++current]
      }

      tokens.push({ type: 'name', value })
      continue
    }

    // 如果遇到无法识别的字符，抛出错误
    throw new TypeError('Unknown character: ' + char)
  }

  return tokens
}

/**
 * 语法分析器（Parser）
 * 作用：将 token 数组转换成抽象语法树（AST）
 * 例如：[{ type: 'paren', value: '(' }, ...] -> { type: 'Program', body: [...] }
 * 
 * @param {Array} tokens - token 数组
 * @returns {Object} ast - 抽象语法树
 */
function parser(tokens) {
  let current = 0        // 当前处理到的 token 位置

  /**
   * walk 函数：递归地处理 tokens，构建 AST 节点
   * 这是一个递归下降解析器
   */
  function walk() {
    let token = tokens[current]

    // 处理数字字面量
    if (token.type === 'number') {
      current++
      return {
        type: 'NumberLiteral',
        value: token.value,
      }
    }

    // 处理字符串字面量
    if (token.type === 'string') {
      current++
      return {
        type: 'StringLiteral',
        value: token.value,
      }
    }

    // 处理函数调用表达式
    // 形式：(functionName arg1 arg2 ...)
    if (token.type === 'paren' && token.value === '(') {
      token = tokens[++current]  // 跳过左括号，获取函数名

      const node = {
        type: 'CallExpression',
        name: token.value,       // 函数名
        params: [],              // 参数列表
      }

      token = tokens[++current]  // 移动到第一个参数

      // 循环处理所有参数，直到遇到右括号
      while (token.type !== 'paren' || (token.type === 'paren' && token.value !== ')')) {
        node.params.push(walk()) // 递归处理参数（参数可能也是函数调用）
        token = tokens[current]
      }

      current++                  // 跳过右括号
      return node
    }

    // 如果遇到无法识别的 token 类型，抛出错误
    throw new TypeError(token.type)
  }

  // 创建根节点
  const ast = {
    type: 'Program',
    body: [],                    // 程序体，包含所有顶层表达式
  }

  // 处理所有 tokens，构建完整的 AST
  while (current < tokens.length) {
    ast.body.push(walk())
  }

  return ast
}

/**
 * 遍历器（Traverser）
 * 作用：遍历 AST 的每个节点，使用访问者模式执行操作
 * 这是实现 AST 转换的核心工具
 * 
 * @param {Object} ast - 抽象语法树
 * @param {Object} visitor - 访问者对象，定义了如何处理每种节点类型
 */
function traverser(ast, visitor) {
  /**
   * 遍历节点数组
   */
  function traverseArray(array, parent) {
    array.forEach((child) => {
      traverseNode(child, parent)
    })
  }

  /**
   * 遍历单个节点
   * @param {Object} node - 当前节点
   * @param {Object} parent - 父节点
   */
  function traverseNode(node, parent) {
    // 获取当前节点类型对应的访问者方法
    const methods = visitor[node.type]

    // 如果定义了 enter 方法，在进入节点时调用
    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    // 根据节点类型，递归遍历子节点
    switch (node.type) {
      case 'Program':
        // 遍历程序体中的所有语句
        traverseArray(node.body, node)
        break

      case 'CallExpression':
        // 遍历函数调用的所有参数
        traverseArray(node.params, node)
        break

      case 'NumberLiteral':
      case 'StringLiteral':
        // 字面量节点没有子节点，不需要继续遍历
        break

      default:
        throw new TypeError(node.type)
    }

    // 如果定义了 exit 方法，在离开节点时调用
    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }

  // 从根节点开始遍历
  traverseNode(ast, null)
}

/**
 * 转换器（Transformer）
 * 作用：将旧的 AST 转换成新的 AST
 * 将 Lisp 风格的 AST 转换为 C 风格的 AST
 * 
 * @param {Object} ast - 原始 AST
 * @returns {Object} newAst - 转换后的新 AST
 */
function transformer(ast) {
  // 创建新的 AST
  const newAst = {
    type: 'Program',
    body: [],
  }

  // 在旧 AST 上添加一个 _context 属性
  // 这是一个引用，指向新 AST 的 body 数组
  // 通过这个引用，子节点可以将自己添加到父节点的正确位置
  ast._context = newAst.body

  // 使用 traverser 遍历旧 AST，并在遍历过程中构建新 AST
  traverser(ast, {
    // 处理数字字面量
    NumberLiteral: {
      enter(node, parent) {
        // 将新的 NumberLiteral 节点添加到父节点的 context 中
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value,
        })
      },
    },

    // 处理字符串字面量
    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value,
        })
      },
    },

    // 处理函数调用表达式
    CallExpression: {
      enter(node, parent) {
        // 创建新的 CallExpression 节点
        // 新的结构包含 callee（被调用者）和 arguments（参数列表）
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',    // 在新 AST 中，函数名用 Identifier 表示
            name: node.name,
          },
          arguments: [],
        }

        // 为当前节点设置 _context
        // 子节点（参数）会将自己添加到这个 arguments 数组中
        node._context = expression.arguments

        // 如果父节点不是 CallExpression
        // 说明这是顶层的函数调用，需要包装成 ExpressionStatement
        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression,
          }
        }

        // 将表达式添加到父节点的 context 中
        parent._context.push(expression)
      },
    },
  })

  return newAst
}

/**
 * 代码生成器（Code Generator）
 * 作用：将 AST 转换回代码字符串
 * 递归地遍历 AST 节点，生成对应的代码
 * 
 * @param {Object} node - AST 节点
 * @returns {string} - 生成的代码字符串
 */
function codeGenerator(node) {
  switch (node.type) {
    case 'Program':
      // 递归生成所有语句，用换行符连接
      return node.body.map(codeGenerator).join('\n')

    case 'ExpressionStatement':
      // 生成表达式，并在末尾添加分号
      return codeGenerator(node.expression) + ';'

    case 'CallExpression':
      // 生成函数调用：functionName(arg1, arg2, ...)
      return (
        codeGenerator(node.callee) +           // 函数名
        '(' +
        node.arguments.map(codeGenerator).join(', ') +  // 参数列表
        ')'
      )

    case 'Identifier':
      // 直接返回标识符名称
      return node.name

    case 'NumberLiteral':
      // 直接返回数字值
      return node.value

    case 'StringLiteral':
      // 返回带引号的字符串
      return '"' + node.value + '"'

    default:
      throw new TypeError(node.type)
  }
}

/**
 * 编译器主函数（Compiler）
 * 作用：将所有阶段串联起来，完成完整的编译过程
 * 
 * @param {string} input - 源代码字符串
 * @returns {string} output - 编译后的代码字符串
 */
function compiler(input) {
  const tokens = tokenizer(input)      // 1. 词法分析：源代码 → tokens
  const ast = parser(tokens)           // 2. 语法分析：tokens → 旧 AST
  const newAst = transformer(ast)      // 3. 转换：旧 AST → 新 AST
  const output = codeGenerator(newAst) // 4. 代码生成：新 AST → 目标代码

  return output
}

export { tokenizer, parser, traverser, transformer, codeGenerator, compiler }
