// 605. 种花问题
// 假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

// 给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回True，不能则返回False。
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
var canPlaceFlowers = function (flowerbed, n) {
	let max = 0;
	for (let i = 0; i < flowerbed.length - 1; i++) {
		if (flowerbed[i] === 0) {
			if (i === 0 && flowerbed[1] === 0) {
				max++;
				i++;
			} else if (flowerbed[i - 1] === 0 && flowerbed[i + 1] === 0) {
				max++;
				i++;
			}
		}
	}
	return max >= n;
};

// var canPlaceFlowers = function (flowerbed, n) {
//   let count = 1, sum = 0;
//   for (val of flowerbed) {
//     if (val == 1) {
//       if (count > 1) sum += Math.floor((count - 1) / 2);
//       count = 0;
//     } else {
//       count++;
//     }
//   }
//   if (count > 1) sum += Math.floor(count / 2);
//   return sum >= n;
// };
