// 要求：给定一个字符串 str，请实现一个函数 isMatch(str) 判断这个字符串中的括号{}()[]是否是匹配(括号能成对代表能匹配)
// 例如：以下三个字符串均为括号匹配的：(xxx){(xxx)[{yyy}yy]} ,  {(abc)}[efg]{(dfd)} ,  [{{[()]}}]
//          以下两个字符串均为括号不匹配的： (zzz{xxxx)}， {(yyy)]zzz{yyy}
// 测试用例：
// console.log(isMatch("(xxx){(xxx)[{yyy}yy]}"))     //true
// console.log(isMatch("{(abc)}[efg]{(dfd)}"))          //true
// console.log(isMatch("[{{[()]}}]"))                         //true
// console.log(isMatch(" (zzz{xxxx)}"))                     //false
// console.log(isMatch("{(yyy)]zzz{yyy}"))               //false

function isMatch(str) {
  const stack = [];
  const map = {
    '{': '}',
    '(': ')',
    '[': ']',
  };

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '{' || str[i] === '(' || str[i] === '[') {
      stack.push(str[i]);
    } else if (str[i] === '}' || str[i] === ')' || str[i] === ']') {
      const left = stack.pop();
      if (map[left] !== str[i]) {
        return false;
      }
    }
  }
  if (stack.length > 0) {
    return false;
  }
  return true;
}

console.log(isMatch('(xxx){(xxx)[{yyy}yy]}')); //true
console.log(isMatch('{(abc)}[efg]{(dfd)}')); //true
console.log(isMatch('[{{[()]}}]')); //true
console.log(isMatch(' (zzz{xxxx)}')); //false
console.log(isMatch('{(yyy)]zzz{yyy}')); //false
