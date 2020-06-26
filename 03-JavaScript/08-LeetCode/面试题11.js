// https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/
// 面试题11. 旋转数组的最小数字

// 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。
// 输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。
// 例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。

// 示例 1：

// 输入：[3,4,5,1,2]
// 输出：1

// 示例 2：

// 输入：[2,2,2,0,1]
// 输出：0

/**
 * @param {number[]} numbers
 * @return {number}
 */

var minArray = function (numbers) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i + 1] < numbers[i]) {
      return numbers[i + 1];
    }
  }
  return numbers[0];
};


var minArray = function (numbers) {
  let i = 0, j = numbers.length - 1;
  while (i < j) {
    const m = Math.floor((i + j) / 2);
    if (numbers[m] > numbers[j]) {
      i = m + 1;
    } else if (numbers[m] < numbers[j]) {
      j = m;
    } else {
      j--;
    }
  }
  return numbers[i];
};
