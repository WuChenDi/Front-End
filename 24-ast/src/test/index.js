/* eslint-disable no-console */

import assert from 'node:assert/strict'
import { tokenizer, parser, transformer, codeGenerator, compiler } from '../index.js'

const input = '(add 2 (subtract 4 2))'
const output = 'add(2, subtract(4, 2));'

const tokens = [
  { type: 'paren', value: '(' },
  { type: 'name', value: 'add' },
  { type: 'number', value: '2' },
  { type: 'paren', value: '(' },
  { type: 'name', value: 'subtract' },
  { type: 'number', value: '4' },
  { type: 'number', value: '2' },
  { type: 'paren', value: ')' },
  { type: 'paren', value: ')' },
]

const ast = {
  type: 'Program',
  body: [
    {
      type: 'CallExpression',
      name: 'add',
      params: [
        {
          type: 'NumberLiteral',
          value: '2',
        },
        {
          type: 'CallExpression',
          name: 'subtract',
          params: [
            {
              type: 'NumberLiteral',
              value: '4',
            },
            {
              type: 'NumberLiteral',
              value: '2',
            },
          ],
        },
      ],
    },
  ],
}

const newAst = {
  type: 'Program',
  body: [
    {
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: 'add',
        },
        arguments: [
          {
            type: 'NumberLiteral',
            value: '2',
          },
          {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'subtract',
            },
            arguments: [
              {
                type: 'NumberLiteral',
                value: '4',
              },
              {
                type: 'NumberLiteral',
                value: '2',
              },
            ],
          },
        ],
      },
    },
  ],
}

console.log('🚀 Starting Compiler Tests...\n')

// 1. Tokenizer Test
console.log('1. Testing Tokenizer...')
console.log(`   Input:  "${input}"`)
const generatedTokens = tokenizer(input)
console.log('   Output:', JSON.stringify(generatedTokens, null, 2))
assert.deepStrictEqual(generatedTokens, tokens, 'Tokenizer failed!')
console.log('   ✅ Tokenizer test passed!\n')

// 2. Parser Test
console.log('2. Testing Parser...')
console.log('   Input:  Tokens')
const generatedAst = parser(tokens)
console.log('   Output:', JSON.stringify(generatedAst, null, 2))
assert.deepStrictEqual(generatedAst, ast, 'Parser failed!')
console.log('   ✅ Parser test passed!\n')

// 3. Transformer Test
console.log('3. Testing Transformer...')
console.log('   Input:  Original AST')
const transformedAst = transformer(ast)
console.log('   Output:', JSON.stringify(transformedAst, null, 2))
assert.deepStrictEqual(transformedAst, newAst, 'Transformer failed!')
console.log('   ✅ Transformer test passed!\n')

// 4. Code Generator Test
console.log('4. Testing Code Generator...')
console.log('   Input:  New AST')
const generatedCode = codeGenerator(newAst)
console.log(`   Output: "${generatedCode}"`)
assert.strictEqual(generatedCode, output, 'Code Generator failed!')
console.log('   ✅ Code Generator test passed!\n')

// 5. Compiler (Integration) Test
console.log('5. Testing full Compiler pipeline...')
console.log(`   Input:  "${input}"`)
const finalOutput = compiler(input)
console.log(`   Output: "${finalOutput}"`)
assert.strictEqual(finalOutput, output, 'Compiler failed!')
console.log('   ✅ Full compiler test passed!\n')

console.log('🎉 All tests passed successfully! The compiler works as expected.')
