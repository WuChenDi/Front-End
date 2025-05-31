export function evalRPN(tokens: string[]): number {
  const stack: number[] = []

  for (const token of tokens) {
    if (['+', '-', '*', '/'].includes(token)) {
      if (stack.length < 2) {
        throw new Error('Invalid expression: not enough operands')
      }
      const b: number = stack.pop()!
      const a: number = stack.pop()!
      let result: number
      switch (token) {
        case '+':
          result = a + b
          break
        case '-':
          result = a - b
          break
        case '*':
          result = a * b
          break
        case '/':
          result = Math.trunc(a / b)
          break
        default:
          throw new Error(`Invalid operator: ${token}`)
      }
      stack.push(result)
    } else {
      const num: number = parseInt(token)
      if (isNaN(num)) {
        throw new Error(`Invalid token: ${token}`)
      }
      stack.push(num)
    }
  }

  if (stack.length !== 1) {
    throw new Error('Invalid expression: too many operands')
  }

  return stack.pop()!
}
