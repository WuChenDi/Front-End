
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
{
    // one
    function Palindrome1(input) {
        if (typeof input !== 'string') return false;
        return input.split('').reverse().join('') === input;
    }
}

{
    // two
    function Palindrome2(line) {
        line += "";
        for (var i = 0, j = line.length - 1; i < j; i++ , j--) {
            if (line.charAt(i) !== line.charAt(j)) {
                return false;
            }
        }
        return true;
    }
}

{
    var name = 'global';
    var obj = {
        name: 'obj',
        sex: function () {
            this.name = 'sex';
            return function () {
                return this.name;
            }
        }
    }
    console.log(obj.sex().call(this));
    console.log(obj.sex().call(obj));
}

{
    // 正则实现trim()功能
    function myTrim(str) {
        let reg = /^\s+|\s+$/g;
        return str.replace(reg, "");
    }
    let str = '    asdf    ';
    console.log(myTrim(str));
}


{
    // 判断数组或者一个字符串中出现次数最多的元素及其出现的次数
    function maxCountElement(arr) {
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            var key = arr[i];
            if (obj[key]) {
                obj[key]++;
            } else {
                obj[key] = 1;
            }
        }
        var maxCount = 0;
        var maxElement = arr[0];
        var eq = [];
        for (var key in obj) {
            if (maxCount < obj[key]) {
                maxCount = obj[key];
                maxElement = key;
                eq.length = 0;
            } else if (maxCount === obj[key]) {
                eq.push(key);
            }
        }
        if (eq.length > 0) {
            for (var j = 0; j < eq.length; j++) {
                maxElement += '，' + eq[j];
            }
        }
        return "该数组中出现次数最多的元素:" + maxElement + "-----出现了:" + maxCount + "次";
    }
    var arr = [1, 2, 2, 2, 3, 3, 3, 4, 5, 6];
    var res = maxCountElement(arr);
    console.log(res);
}

{
    // 统计数组中相同项的个数
    var cars = ['BMW', 'Benz', 'Benz', 'Benz', 'Tesla', 'BMW', 'Toyota'];
    var carsObj = cars.reduce(function (obj, name) {
        obj[name] = obj[name] ? ++obj[name] : 1;
        return obj;
    }, {});
    carsObj;
}

{
    /** 
     * reduce方法同时实现map和filter
     * 需求：假设现在有一个数列，你希望更新它的每一项（map的功能）然后筛选出一部分（filter的功能）。如果是先使用map然后filter的话，你需要遍历这个数组两次。 在下面的代码中，我们将数列中的值翻倍，然后挑选出那些大于50的数
     */
    const numbers = [10, 20, 30, 40];
    const doubledOver50 = numbers.reduce((finalList, num) => {
        num = num * 2;
        if (num > 50) {
            finalList.push(num);
        }
        return finalList;
    }, []);
    doubledOver50;
}

{
    /** 
     * 需求：假设需要对字符串进行字符长度限制
     * str为字符串，len为长度
     */
    function setString(str, len) {
        var strlen = 0;
        var s = "";
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 128) {
                strlen += 2;
            } else {
                strlen++;
            }
            s += str.charAt(i);
            if (strlen >= len) {
                return s + "...";
            }
        }
        return s;
    }
}

{
    // 获取 URL 的中参数
    // 正则
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }
    // 这样调用：
    // alert(GetQueryString("参数名1"));
    // alert(GetQueryString("参数名2"));
    // alert(GetQueryString("参数名3"));

    // split拆分法
    function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    var Request = new Object();
    Request = GetRequest();
    // var 参数1,参数2,参数3,参数N;
    // 参数1 = Request['参数1'];
    // 参数2 = Request['参数2'];
    // 参数3 = Request['参数3'];
    // 参数N = Request['参数N'];

    // 修改 URL 的中某个参数值
    //替换指定传入参数的值,paramName为参数,replaceWith为新值
    function replaceParamVal(paramName, replaceWith) {
        var oUrl = this.location.href.toString();
        var re = eval('/(' + paramName + '=)([^&]*)/gi');
        var nUrl = oUrl.replace(re, paramName + '=' + replaceWith);
        this.location = nUrl;
        window.location.href = nUrl
    }

    /** 
     * 指定参数名称，返回该参数的值 或者 空字符串
     * 不指定参数名称，返回全部的参数对象 或者 {}
     * 如果存在多个同名参数，则返回数组
    */
    function getUrlParam(url, key) {
        var arr = {};
        url.replace(/\??(\w+)=(\w+)&?/g, function (match, matchKey, matchValue) {
            if (!arr[matchKey]) {
                arr[matchKey] = matchValue;
            } else {
                var temp = arr[matchKey];
                arr[matchKey] = [].concat(temp, matchValue);
            }
        });
        if (!key) {
            return arr;
        } else {
            for (ele in arr) {
                if (ele = key) {
                    return arr[ele];
                }
            }
            return '';
        }
    }
}

{
    // ios下，页面上下滑动时，input的光标错位了
    $('input').blur(function () {
        setTimeout(function () {
            var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
            window.scrollTo(0, currentPosition);//页面向上滚动
        }, 200)
    })
}

{
    // 判断类型
    function toType(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    }
}

{
    // 检测平台（设备）类型
    let isWechat = /micromessenger/i.test(navigator.userAgent),
        isWeibo = /weibo/i.test(navigator.userAgent),
        isQQ = /qq\//i.test(navigator.userAgent),
        isIOS = /(iphone|ipod|ipad|ios)/i.test(navigator.userAgent),
        isAndroid = /android/i.test(navigator.userAgent);
}