// 剑指 Offer 05. 替换空格

// 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

/**
 * @param {string} s
 * @return {string}
 */
 var replaceSpace = function(s) {
  // return s.split(' ').join('%20');
  return s.replace(/\s/g, '%20');
};
