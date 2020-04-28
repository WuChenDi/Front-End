// 89. 格雷编码
// 格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。

// 给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。即使有多个不同答案，你也只需要返回其中一种。

// 格雷编码序列必须以 0 开头。

/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function (n) {
	let make = (n) => {
		if (n === 1) {
			return ["0", "1"];
		} else {
			let prev = make(n - 1);
			let result = [];
			let max = Math.pow(2, n) - 1;
			for (let i = 0; i < prev.length; i++) {
				result[i] = `0${prev[i]}`;
				result[max - i] = `1${prev[i]}`;
			}
			return result;
		}
	};
	return make(n);
};

var grayCode = function (n) {
	let make = (n) => {
		if (n === 1) return [0, 1];
		let result = make(n - 1);
		let highBit = 1 << (n - 1);
		for (let i = result.length - 1; i >= 0; i--) {
			result.push(result[i] + highBit);
		}
		return result;
	};
	if (n === 0) return [0];
	return make(n);
};

var grayCode = function (n) {
	let res = [0];
	for (let i = 0; i < n; i++) {
		res = res.concat(res.map((item) => (1 << i) + item).reverse());
	}
	return res;
};
