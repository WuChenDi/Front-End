// 1047. 删除字符串中的所有相邻重复项
// 给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。

// 在 S 上反复执行重复项删除操作，直到无法继续删除。

// 在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。

/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function (S) {
	let stack = [];
	for (const c of S) {
		let prev = stack.pop();
		if (prev !== c) {
			stack.push(prev);
			stack.push(c);
		}
	}
	return stack.join("");
};
