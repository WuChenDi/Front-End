// 17 电话号码的字母组合
// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

export default (str) => {
	if (str.length <= 0) return [];
	// 建立电话号码键盘映射
	let map = ["", 1, "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
	// 把输入字符串按单字符分隔变成数组，234=>[2,3,4]
	let num = str.split("");
	// 保存键盘映射后的字母内容，如 23=>['abc','def']
	let code = [];
	num.forEach((item) => {
		if (map[item]) {
			code.push(map[item]);
		}
	});
	if (num.length === 1) {
		return code[0].split("");
	}
	let comb = (arr) => {
		// 临时变量用来保存前两个组合的结果
		let tmp = [];
		for (let i = 0; i < arr[0].length; i++) {
			for (let j = 0; j < arr[1].length; j++) {
				tmp.push(`${arr[0][i]}${arr[1][j]}`);
			}
		}
		arr.splice(0, 2, tmp);
		if (arr.length > 1) {
			comb(arr);
		} else {
			return tmp;
		}
		return arr[0];
	};
	return comb(code);
};
