{
  for (var i = 1; i <= 3; i++) {
    console.log(i)
    // setTimeout(function () {
    //   console.log(i);
    // }, 0);
  }
}

{
  var a = null;
  console.log(typeof (a))
}

{
  var a = 100;

  function test() {
    console.log(a);
    a = 10;
    console.log(a);
  }
  test();
  console.log(a)
}

{
  String.prototype.trim = function () {
    return this.replace(/^\s+/, "").replace(/\s+$/, "");
  }
}

{
  var uname = 'jack';

  function change() {
    console.log(uname);
    var uname = 'wcd';
    console.log(uname);
  }
  change()
}

{
  let array = [5, 4, 3, 2, 1];
  let temp = 0;
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array.length - i; j++) {
      if (array[i] > array[j + 1]) {
        temp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = temp;
      }
    }
  }
  console.log(array)
}

{
  function modifyArray(arr, callback) {
    arr.push(100);
    callback();
  }
  let arr = [1, 2, 3, 4];
  modifyArray(arr, function () {
    console.log("array has been modified", arr)
  })
}

{
  function createBase(baseNumber) {
    return function (N) {
      return baseNumber + N;
    }
  }
  let addSix = createBase(6);
  console.log(addSix(10))
  console.log(addSix(21))

}

// 1~100的完全平方数
{
  function isSqrt(n) {
    for (var i = 1; n > 0; i += 2) {
      n -= i;
    };
    return 0 == n;
  }
  for (var j = 1; j <= 100; j++) {
    if (isSqrt(j)) {
      console.log(j)
    }
  }
}


// 实现一个函数，判断输入是不是回文字符串(在我的理解，如果将一个字符串翻转过来，能和原字符串完全相等，那么就可以称之为“回文”)
// one
{
  function Palindrome1(input) {
    if (typeof input !== 'string') return false;
    return input.split('').reverse().join('') === input;
  }
}

// two
{
  function Palindrome2(line) {
    line += "";
    for (var i = 0, j = line.length - 1; i < j; i++, j--) {
      if (line.charAt(i) !== line.charAt(j)) {
        return false;
      }
    }
    return true;
  }
}