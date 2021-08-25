function add(a, b) {
	return a + b
}

function minus(a, b) {
	return a - b
}

function multiply(a, b) {
	return a * b
}

const addResult = add(3, 7)
const addExpected = 10
if (addResult !== 10) {
	throw Error(`3+7应等于${addResult}, 但实际结果${addExpected}`)
}

const minusResult = minus(3, 3)
const minusExpected = 0
if (minusResult !== 0) {
	throw Error(`3+7应等于${minusResult}, 但实际结果${minusExpected}`)
}

function expect(result) {
	return {
		toBe: (actual) => {
			if (result !== actual) {
				throw new Error(`预期值和实际值不相等，预期值${actual},实际值${result}`)
			}
		},
	}
}

function test(desc, fn) {
	try {
		fn?.()
		console.log(`${desc} 测试通过`)
	} catch (error) {
		console.log(`${desc} 没有测试通过${error}`)
	}
}

test('测试加法 3 + 7', () => {
	expect(add(3, 7)).toBe(10)
})

test('测试减法 3 - 3', () => {
	expect(minus(3, 3)).toBe(0)
})
