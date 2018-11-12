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