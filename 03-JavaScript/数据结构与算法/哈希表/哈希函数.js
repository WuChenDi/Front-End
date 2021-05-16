/**
 * 设计哈希函数
 * 1. 将字符串转换成比较大的数字，这个数字称为 hashCode
 * 2. 将大的数字压缩到数组(size) 范围之内既 index
 *
 * 公式：
 * hashCode = hashCode * PRIME_NUMBER + key.charCodeAt(i);
 * 取余操作：hashCode % size;(霍纳法则)
 * PRIME_NUMBER 为质数，且小于数组的容量
 * size为哈希表的长度
 */

function hasFunc(str, size = 7) {
  // 质数
  const PRIME_NUMBER = 37;
  // 定义hasCode变量
  let hasCode = 0;
  // 霍纳算法，来计算hasCode的值
  for (let i = 0; i < str.length; i++) {
    hasCode = PRIME_NUMBER * hasCode + str.charCodeAt(i);
  }
  // 取余操作
  return hasCode % size;
}

console.log(hasFunc("aa", 7));
console.log(hasFunc("AA", 7));
console.log(hasFunc("bb", 7));
console.log(hasFunc("BB", 7));
