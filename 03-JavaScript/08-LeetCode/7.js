// 7. 整数反转

// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
	var result = 0;
	var sign = Math.sign(x);
	x = Math.abs(x);
	while (x != 0) {
		result = result * 10 + (x % 10);
		x = (x / 10) | 0;
	}
	if (result > 2147483647 || result < -2147483648) {
		return 0;
	}
	return sign * result;
};
