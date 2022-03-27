// 914. 卡牌分组
// 给定一副牌，每张牌上都写着一个整数。

// 此时，你需要选定一个数字 X，使我们可以将整副牌按下述规则分成 1 组或更多组：

// 每组都有 X 张牌。
// 组内所有的牌上都写着相同的整数。
// 仅当你可选的 X >= 2 时返回 true。

export default (arr) => {
	arr.sort((a, b) => {
		a - b;
	});
	let min = Number.MAX_SAFE_INTEGER;
	let dst = [];
	let result = true;
	let tmp = [];
	for (let i = 0; i < arr.length; i++) {
		tmp.push(arr[i]);
		for (let j = i + 1; j < arr.length - 1; j++) {
			if (arr[i] === arr[j]) {
				tmp.push(arr[j]);
			} else {
				if (min > tmp.length) {
					min = tmp.length;
				}
				dst.push([].concat(tmp));
				tmp.length = 0;
				i = j;
				break;
			}
		}
	}
	dst.every((item) => {
		if (item.length % min !== 0) {
			result = false;
			return false;
		}
	});
	return result;

	// function gcd(num1, num2) {
	// 	return num2 === 0 ? num1 : gcd(num2, num1 % num2);
	// }
	// let timeMap = new Map();
	// arr.forEach((num) => {
	// 	timeMap.set(num, timeMap.has(num) ? timeMap.get(num) + 1 : 1);
	// });
	// let timeAry = [...timeMap.values()];
	// let g = timeAry[0];
	// timeAry.forEach((time) => {
	// 	g = gcd(g, time);
	// });
	// return g >= 2;
};
