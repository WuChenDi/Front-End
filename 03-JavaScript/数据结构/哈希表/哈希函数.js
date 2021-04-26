/**
 * 设计哈希函数
 * 1.将字符串转成比较大的数字：hasCode
 * 2.将大的数字hasCode压缩到数组范围（大小）之内
 *
 */

function hasFunc(str, size) {
	//定义hasCode变量
	let hasCode = 0;
	//霍纳算法，来计算hasCode的值
	// Unicode编码
	for (let i = 0; i < str.length; i++) {
		hasCode = 37 * hasCode + str.charCodeAt(i);
	}
	// 取余操作
	let index = hasCode % size;
	return index;
}

console.log(hasFunc("dsvdsvdfvfdv", 7));
console.log(hasFunc("Abcds", 7));
console.log(hasFunc("hytknmtp", 7));
console.log(hasFunc("emllosdfh", 7));
