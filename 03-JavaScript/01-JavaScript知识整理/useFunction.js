{
    for (var i = 1; i <= 3; i++) {
        console.log(i); // 1 2 3
        // setTimeout(function () {
        //   console.log(i); // 4 4 4
        // }, 0);
    }
}

{
    var a = null;
    console.log(typeof a); // object
}

{
    var a = 100;

    function test() {
        console.log(a); // 100
        a = 10;
        console.log(a); // 10
    }
    test();
    console.log(a); // 10
}

{
    var uname = "jack";
    function change() {
        console.log(uname); // undefined
        var uname = "wcd";
        console.log(uname); // wcd
    }
    change();
}

{
    function createBase(baseNumber) {
        return function (N) {
            return baseNumber + N;
        };
    }
    let addSix = createBase(6);
    console.log(addSix(10)); // 16
    console.log(addSix(21)); // 27
}

{
    // 1~100的完全平方数
    function isSqrt(n) {
        for (var i = 1; n > 0; i += 2) {
            n -= i;
        }
        return 0 == n;
    }
    for (var j = 1; j <= 100; j++) {
        if (isSqrt(j)) {
            console.log(j); // 1 4 9 16 25 36 49 64 81 100
        }
    }
}

{
    // 实现一个函数，判断输入是不是回文字符串(在我的理解，如果将一个字符串翻转过来，能和原字符串完全相等，那么就可以称之为“回文”)

    // one
    function Palindrome1(input) {
        if (typeof input !== "string") return false;
        return (input.split("").reverse().join("") === input);
    }

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
    var name = "global";
    var obj = {
        name: "obj",
        sex: function () {
            this.name = "wcd";
            return function () {
                return this.name;
            };
        }
    };
    console.log(obj.sex().call(this)); // undefined
    console.log(obj.sex().call(obj)); // wcd
}

{
    String.prototype.trim = function () {
        return this.replace(/^\s+/, "").replace(/\s+$/, "");
    };
}

{
    // 正则实现trim()功能
    function myTrim(str) {
        let reg = /^\s+|\s+$/g;
        return str.replace(reg, "");
    }
    let str = "    wcd    ";
    console.log(myTrim(str)); // wcd
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
                maxElement += "，" + eq[j];
            }
        }
        return `该数组中出现次数最多的元素:${maxElement},出现了:${maxCount}次`;
    }
    var arr = [1, 2, 2, 2, 3, 3, 3, 4, 5, 6];
    var res = maxCountElement(arr);
    console.log(res); // 该数组中出现次数最多的元素:2，3,出现了:3次
}

{
    // 统计数组中相同项的个数
    var cars = ["xiaoming", "xiaohong", "xiaohong", "xiaohong", "xiaolv", "xiaolan", "xiaohei"];
    var carsObj = cars.reduce(function (obj, name) {
        obj[name] = obj[name] ? ++obj[name] : 1;
        return obj;
    }, {});
    console.log(carsObj); // { xiaoming: 1, xiaohong: 3, xiaolv: 1, xiaolan: 1, xiaohei: 1 }
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
    console.log(doubledOver50); // [ 60, 80 ]
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
    // 获取 URL 的中参数 (推荐 https://github.com/derek-watson/jsUri)
    // 正则
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null) context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }
    // such as：
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
        var re = eval("/(" + paramName + "=)([^&]*)/gi");
        var nUrl = oUrl.replace(re, paramName + "=" + replaceWith);
        this.location = nUrl;
        window.location.href = nUrl;
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
                if ((ele = key)) {
                    return arr[ele];
                }
            }
            return "";
        }
    }
}

{
    // ios下，页面上下滑动时，input的光标错位了
    $("input").blur(function () {
        setTimeout(function () {
            var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
            window.scrollTo(0, currentPosition); //页面向上滚动
        }, 200);
    });

    // 多个input情况
    // ios系统用户在点击输入框，出现键盘后，弹出层被顶上去，而光标还停留在原处，即出现错位情况
    $(function () {
        var setTimerTop = 0;
        $(document).on('blur', 'input.kfzb-input', function () {
            event.preventDefault()
            setTimerTop = setTimeout(function () {
                window.scrollTo(0, 0); // 页面向上滚动
            }, 500)
        }).on('focus', 'input.kfzb-input', function () {
            clearTimeout(setTimerTop)
        })
    })
}

{
    // 判断类型
    function toType(obj) {
        return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
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

{
    // 简单 函数防抖
    function debounce(method, wait) {
        let timeout;
        // args为返回函数调用时传入的参数，传给method
        return function (...args) {
            let context = this;
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                // args是一个数组，所以使用fn.apply
                // 也可写作method.call(context, ...args)
                method.apply(context, args);
            }, wait);
        };
    }
    // goods 函数防抖
    function debounce(method, wait, immediate) {
        let timeout;
        // debounced函数为返回值
        // 使用Async/Await处理异步，如果函数异步执行，等待setTimeout执行完，拿到原函数返回值后将其返回
        // args为返回函数调用时传入的参数，传给method
        let debounced = function (...args) {
            return new Promise(resolve => {
                // 用于记录原函数执行结果
                let result;
                // 将method执行时this的指向设为debounce返回的函数被调用时的this指向
                let context = this;
                // 如果存在定时器则将其清除
                if (timeout) {
                    clearTimeout(timeout);
                }
                // 立即执行需要两个条件，一是immediate为true，二是timeout未被赋值或被置为null
                if (immediate) {
                    // 如果定时器不存在，则立即执行，并设置一个定时器，wait毫秒后将定时器置为null
                    // 这样确保立即执行后wait毫秒内不会被再次触发
                    let callNow = !timeout;
                    timeout = setTimeout(() => {
                        timeout = null;
                    }, wait);
                    // 如果满足上述两个条件，则立即执行并记录其执行结果
                    if (callNow) {
                        result = method.apply(context, args);
                        resolve(result);
                    }
                } else {
                    // 如果immediate为false，则等待函数执行并记录其执行结果
                    // 并将Promise状态置为fullfilled，以使函数继续执行
                    timeout = setTimeout(() => {
                        // args是一个数组，所以使用fn.apply
                        // 也可写作method.call(context, ...args)
                        result = method.apply(context, args);
                        resolve(result);
                    }, wait);
                }
            });
        };

        // 在返回的debounced函数上添加取消方法
        debounced.cancel = function () {
            clearTimeout(timeout);
            timeout = null;
        };

        return debounced;
    }
}

{
    // 生成 -0

    // 首先创建一个8位的ArrayBuffer
    const buffer = new ArrayBuffer(8);
    // 创建DataView对象操作buffer
    const dataView = new DataView(buffer);
    // 将第1个字节设置为0x80，即最高位为1
    dataView.setUint8(0, 0x80);
    // 将buffer内容当做Float64类型返回
    console.log(dataView.getFloat64(0)); // -0

    // -0
    console.log(0 * -1); // -0
}

{
    // 对后端返回的列表数据进行相同数据整合处理
    let oldList = [
        { id: 111, date: "05-25", list: [1, 2, 3] },
        { id: 222, date: "05-26", list: [4, 5] },
        { id: 111, date: "05-25", list: [4, 5] }
    ];
    function formatList() {
        return Array.from(
            oldList.reduce((dict, item) => {
                if (dict.has(item.id)) {
                    dict.get(item.id).list.push(...item.list);
                } else {
                    dict.set(item.id, {
                        id: item.id,
                        date: item.date,
                        list: [...item.list]
                    });
                }
                return dict;
            }, new Map())
        ).map(item => ({
            date: item[1].date,
            id: item[1].id,
            list: item[1].list
        }));
    }
    console.log(formatList());
    // [
    //     { id: 111, date: "05-25", list: [1, 2, 3, 4, 5] },
    //     { id: 222, date: "05-26", list: [4, 5] }
    // ];
}

{
    // 实现数字金额转大写金额
    function digitUppercase(n) {
        let fraction = ["角", "分"];
        let digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
        let unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];
        let head = n < 0 ? "欠" : "";
        n = Math.abs(n);
        let s = "";
        for (let i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, "");
        }
        s = s || "整";
        n = Math.floor(n);
        for (let k = 0; k < unit[0].length && n > 0; k++) {
            let p = "";
            for (let j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = `${p.replace(/(零.)*零$/, "").replace(/^$/, "零")}${unit[0][k]}${s}`;
        }
        return `${head}${s.replace(/(零.)*零元/, "元").replace(/(零.)+/g, "零").replace(/^整$/, "零元整")}`;
    }

    console.log(digitUppercase(7682.01)); // 柒仟陆佰捌拾贰元壹分
    console.log(digitUppercase(7682)); // 柒仟陆佰捌拾贰元整
    console.log(digitUppercase(951434677682.0)); // 玖仟伍佰壹拾肆亿叁仟肆佰陆拾柒万柒仟陆佰捌拾贰元整


    function noToChinese(num) {
        if (!/^\d*(\.\d*)?$/.test(num)) return;

        var digit = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
        var unit = new Array("", "拾", "佰", "仟", "萬", "億", "点", "");
        var a = ("" + num).replace(/(^0*)/g, "").split("."),
            k = 0,
            re = "";
        for (var i = a[0].length - 1; i >= 0; i--) {
            switch (k) {
                case 0:
                    re = unit[7] + re;
                    break;
                case 4:
                    if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                        re = unit[4] + re;
                    break;
                case 8:
                    re = unit[5] + re;
                    unit[7] = unit[5];
                    k = 0;
                    break;
            }
            if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
                re = digit[0] + re;
            if (a[0].charAt(i) != 0) re = digit[a[0].charAt(i)] + unit[k % 4] + re;
            k++;
        }
        // 处理小数部分
        if (a.length > 1) {
            re += unit[6];
            for (var i = 0; i < a[1].length; i++) re += digit[a[1].charAt(i)];
        }
        return re;
    }
}

{
    const clothes = ["jacket", "t-shirt"];
    clothes.length = 0;
    console.log(clothes[0]); // undefined
    // 由于 length 属性行为，当 JavaScript 执行 clothes.length = 0 时，删除所有的 clothes 项。 所以 clothes[0] 的值为 undefined，因为 clothes 数组已被清空。
}

{
    // 返回字符串的字节长度
    function byteSize(str) {
        return new Blob([str]).size;
    }
    console.log(byteSize("Hello World")); // 11
}

{
    // 平均数
    const average = (...nums) => nums.reduce((acc, val) => acc + val, 0) / nums.length;
    console.log(average(...[1, 2, 3])); // 2
    console.log(average(1, 2, 3)); // 2
}

{
    // 首字母大写
    const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');
    console.log(capitalize('fooBar')); // FooBar
    console.log(capitalize('fooBar', true)); // FooBar

    // 首字母小写
    const decapitalize = ([first, ...rest]) => first.toLowerCase() + rest.join('');
    console.log(decapitalize('FooBar')); // fooBar
    console.log(decapitalize('FooBar')); // fooBar

    // 每个单词首字母大写
    const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
    console.log(capitalizeEveryWord('hello world!')); // 'Hello World!'
}

{
    // 当前日期天数
    const dayOfYear = date => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    console.log(dayOfYear(new Date())); // 302

    // 返回日期间的天数
    const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);
    console.log(getDaysDiffBetweenDates(new Date('2019-01-01'), new Date('2019-10-29'))); // 301
}

{
    // 平滑滚动至顶部
    const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop;
        if (c > 0) {
            window.requestAnimationFrame(scrollToTop);
            window.scrollTo(0, c - c / 8);
        }
    };

    // 滚动到指定元素区域
    const smoothScroll = element =>
        document.querySelector(element).scrollIntoView({
            behavior: 'smooth'
        });
    smoothScroll('#fooBar');
}

{
    const isType = (obj, type) => {
        if (typeof obj !== 'object') return false;
        const typeString = Object.prototype.toString.call(obj);
        let flag;
        switch (type) {
            case 'Array':
                flag = typeString === '[object Array]';
                break;
            case 'Date':
                flag = typeString === '[object Date]';
                break;
            case 'RegExp':
                flag = typeString === '[object RegExp]';
                break;
            default:
                flag = false;
        }
        return flag;
    }
    const getRegExp = re => {
        var flags = '';
        if (re.global) flags += 'g';
        if (re.ignoreCase) flags += 'i';
        if (re.multiline) flags += 'm';
        return flags;
    }
    /**
    * deep clone
    * @param  {[type]} parent object 需要进行克隆的对象
    * @return {[type]}        深克隆后的对象
    */
    const clone = parent => {
        // 维护两个储存循环引用的数组
        const parents = [];
        const children = [];

        const _clone = parent => {
            if (parent === null) return null;
            if (typeof parent !== 'object') return parent;

            let child, proto;

            if (isType(parent, 'Array')) {
                // 对数组做特殊处理
                child = [];
            } else if (isType(parent, 'RegExp')) {
                // 对正则对象做特殊处理
                child = new RegExp(parent.source, getRegExp(parent));
                if (parent.lastIndex) child.lastIndex = parent.lastIndex;
            } else if (isType(parent, 'Date')) {
                // 对Date对象做特殊处理
                child = new Date(parent.getTime());
            } else {
                // 处理对象原型
                proto = Object.getPrototypeOf(parent);
                // 利用Object.create切断原型链
                child = Object.create(proto);
            }

            // 处理循环引用
            const index = parents.indexOf(parent);

            if (index != -1) {
                // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
                return children[index];
            }
            parents.push(parent);
            children.push(child);

            for (let i in parent) {
                // 递归
                child[i] = _clone(parent[i]);
            }

            return child;
        };
        return _clone(parent);
    };
}