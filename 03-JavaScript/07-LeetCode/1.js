// 1. 两数之和

// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
	for (let i = 0; i < nums.length; i++) {
		let result = target - nums[i];
		if (nums.lastIndexOf(result) !== -1 && nums.lastIndexOf(result) !== i) {
			return [i, nums.lastIndexOf(result)];
		}
	}
};

var twoSum = function (nums, target) {
	for (let i = 0; i < nums.length; i++) {
		let result = nums.lastIndexOf(target - nums[i]);
		if (result > i) {
			return [i, result];
		}
	}
};

var twoSum = function (nums, target) {
	for (let i = 0; i < nums.length - 1; i++) {
		for (let j = i + 1; j < nums.length; j++) {
			if (nums[i] + nums[j] === target) {
				return [i, j];
			}
		}
	}
};

var twoSum = function (nums, target) {
	let map = new Map();
	for (let i = 0; i < nums.length; i++) {
		let k = target - nums[i];
		if (map.has(k)) {
			return [map.get(k), i];
		}
		map.set(nums[i], i);
	}
	return [];
};
