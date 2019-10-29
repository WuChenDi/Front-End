# Javascript 数组详解

1. arr.toString(): 将数组转换为以逗号分隔的字符串；

2. arr.join(): 也是讲数组转换为字符串，只是 join 方法接受一个作为分隔符的参数，如果没有参数，则默认是以逗号分隔；

    ```js
    var arr = ["George","John","Thomas"];
    console.log(arr.join());  // George,John,Thomas
    console.log(arr.join(.));  // George.John.Thomas
    ```

3. arr.push(): push 可以接受任意数量的参数，将参数放在原数组的尾部，该方法返回的是最终数组的长度；

    ```js
    var arr = ["Banana", "Orange", "Apple", "Mango"];
    arr.push("Kiwi"); // 5
    ```

4. arr.unshift(): 用法和 push()相同，只是 unshift 方法是将参数放入原数组的前面；

    ```js
    var arr = ["Banana", "Orange", "Apple", "Mango"];
    arr.unshift("Lemon", "Pineapple"); // 6
    console.log(arr); // ["Lemon", "Pineapple", "Banana", "Orange", "Apple", "Mango"]
    ```

5. arr.pop(): 删除数组的最后一项，返回的是被删除的元素；

    ```js
    var arr = ["Banana", "Orange", "Apple", "Mango"];
    arr.pop(); // "Mango"
    console.log(arr); // ["Banana", "Orange", "Apple"]
    ```

6. arr.shift(): 删除数组的第一项，返回被删除的元素；

    ```js
    var arr = ["Banana", "Orange", "Apple", "Mango"];
    arr.shift(); // "Banana"
    console.log(arr); // ["Orange", "Apple", "Mango"]
    ```

7. arr.reverse(): 翻转数组的顺序；

    ```js
    var arr = ["Banana", "Orange", "Apple", "Mango"];
    arr.reverse();
    console.log(arr); // ["Mango", "Apple", "Orange", "Banana"]
    ```

8. arr.sort(): 将数组进行排序，但需要注意的是这个方法是按 Ascii 码排序，例如：

    ```js
    var arr = [1, 3, 7, 5, 14, 24];
    arr.sort();
    console.log(arr);
    // [1,14,24,3,5,7]
    ```

9. arr.slice(): 基于当前数组，创建一个或多个项，他可以接受一个或两个参数，当参数有一个，他返回的是从参数位置到数组最后的新数组，当参数是两个，他返回的是从开始到结束的位置，但不包括最后的位置；

    ```js
    var nameArr = ["Tom", "Jerry", "Alice", "Nancy", "Candy"];

    var newName = nameArr.slice(1);
    console.log(newName);
    // ["Jerry", "Alice", "Nancy", "Candy"];

    var newName2 = nameArr.slice(1, 4);
    console.log(newName2);
    // ["Jerry", "Alice", "Nancy"]
    ```

10. arr.splice(): 这个方法可以实现数组的增删改功能；

-   删除：只需要提供两个参数，要删除的第一项的位置和要删除的个数,并返回删除的元素数组：

    ```js
    var num = [1, 2, 3, 4, 5];

    var newNum = num.splice(1, 2);
    console.log(num); //[1,4,5]
    console.log(newNum); //[2,3]
    ```

-   插入：提供多个参数，第一个参数是要插入的位置，第二个是 0 表示删除 0 个，后面是要插入的元素，可以是多个，因为删除 0 个，所以返回空数组；

    ```js
    var num = [1, 2, 3, 4, 5];

    var newNum = num.splice(1, 0, "Tom", "Jerry");
    console.log(num); //[1, "Tom", "Jerry", 2, 3, 4, 5]
    console.log(newNum); //[]
    ```

-   替换：提供多个参数，第一个参数是要插入的位置，第二个是删除的个数，后面是要插入的元素，可以是多个，返回删除的数组；
    ```js
    var num = [1, 2, 3, 4, 5];
    var newNum = num.splice(1, 2, "Tom", "Jerry");
    console.log(num); //[1, "Tom", "Jerry", 4, 5]
    console.log(newNum); //[2,3]
    ```

11. arr.indexOf()和 arr.lastIndexOf:查询元素的位置,参数为 1 个或 2 个，第一个是要查找的元素，第二是要开始查找的位置（可选的），他返回的是查找到的第一个元素的下标，indexOf()是从头开始查询，lastIndexOf()是从末尾开始查询；

    ```js
    var arr = ["Banana", "Orange", "Apple", "Mango"];
    var a = arr.indexOf("Apple");
    console.log(a); // 2

    var arr2 = [
        "Banana",
        "Orange",
        "Apple",
        "Mango",
        "Banana",
        "Orange",
        "Apple"
    ];
    var b = arr2.indexOf("Apple", 4);
    console.log(b); // 6
    ```

12. arr.every()和 arr.some()： 两个方法都是给数组的每一项运行给定函数，不同的是 every()方法是如果该函数对每一项都返回 true,那就返回 true，some()方法是只要有一项返回 yrue，那就返回 true：

    ```js
    var num = [1,2,3,4,5];
    var result = num.every(function(item){
      if(item>2) return true;
    });
    alert(result);　　==>false
    若是把every()换位some(),则弹出true；
    ```

13. arr.filter(): 给数组的每一项都运行给定函数，返回结果为 true 的元素组成的数组：
    ```js
    var num = [1, 2, 3, 4, 5];
    var result = num.filter(function(item) {
        if (item > 2) return true;
    });
    alert(result); //[3,4,5]
    ```
