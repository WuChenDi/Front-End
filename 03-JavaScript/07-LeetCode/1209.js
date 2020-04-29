// 1209. 删除字符串中的所有相邻重复项 II
// 给你一个字符串 s，「k 倍重复项删除操作」将会从 s 中选择 k 个相邻且相等的字母，并删除它们，使被删去的字符串的左侧和右侧连在一起。

// 你需要对 s 重复进行无限次这样的删除操作，直到无法继续为止。

// 在执行完所有删除操作后，返回最终得到的字符串。

// 本题答案保证唯一。

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var removeDuplicates = function (s, k) {
  let stack = [];
  for (const c of s) {
    let prev = stack.pop();
    if (!prev || prev[0] !== c) {
      stack.push(prev);
      stack.push(c);
    } else if (prev.length < k - 1) {
      stack.push(prev + c);
    }
  }
  return stack.join("");
};
