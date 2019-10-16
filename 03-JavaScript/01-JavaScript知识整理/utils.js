const localStorage = window.localStorage;
const sessionStorage = window.sessionStorage;

// 设置localStorage存储数据
export const setLocal = (name, content) => {
    if (!name) return;
    if (typeof content !== "string") {
        content = JSON.stringify(content);
    }
    localStorage.setItem(name, content);
};

// 获取localStorage存储数据
export const getLocal = name => {
    if (!name) return;
    let value = localStorage.getItem(name);
    if (value !== null) {
        try {
            value = JSON.parse(value);
        } catch (error) {
            value = value;
        }
    }
    return value;
};

// 删除localStorage存储数据
export const removeLocal = name => {
    if (!name) return;
    localStorage.removeItem(name);
};

// 设置sessionStorage存储数据
export const setSession = (name, content) => {
    if (!name) return;
    if (typeof content !== "string") {
        content = JSON.stringify(content);
    }
    sessionStorage.setItem(name, content);
};

// 获取sessionStorage存储数据
export const getSession = name => {
    if (!name) return;
    let value = sessionStorage.getItem(name);
    if (value !== null) {
        try {
            value = JSON.parse(value);
        } catch (error) {
            value = value;
        }
    }
    return value;
};

// 删除sessionStorage存储数据
export const removeSession = name => {
    if (!name) return;
    sessionStorage.removeItem(name);
};

/**
 * @method 获取URL的中参数
 * @param {*} strUrl
 */
export const getQueryString = strUrl => {
    let reg = new RegExp("(^|&)" + strUrl + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    let context = "";
    if (r != null) context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined"
        ? ""
        : context;
};

/**
 * @method 时间格式化
 * @param {string} time
 * @param {string} format yyyy/mm/dd hh:ii:ss(2019/07/24 09:45:43) yy/m/d hh:ii:ss(19/07/24 09:45:43) yyyy/mm/dd w(2019/07/24 星期三) mm/dd/yyyy(07/24/2019)
 * @returns
 */
export const formatTime = (time, format = "yyyy-mm-dd") => {
    const d = time ? new Date(time) : new Date();
    const t = i => {
        return (i < 10 ? "0" : "") + i;
    };

    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const weekday = d.getDay();

    return format.replace(
        /(yy){1,2}|m{1,2}|d{1,2}|h{1,2}|i{1,2}|s{1,2}|w{1,2}/gi,
        function (r) {
            switch (r.toUpperCase()) {
                case "YY":
                    return ("" + year).substr(2);
                case "YYYY":
                    return year;
                case "M":
                    return month;
                case "MM":
                    return t(month);
                case "D":
                    return day;
                case "DD":
                    return t(day);
                case "H":
                    return hour;
                case "HH":
                    return t(hour);
                case "I":
                    return minutes;
                case "II":
                    return t(minutes);
                case "S":
                    return seconds;
                case "SS":
                    return t(seconds);
                case "W":
                    return `星期${
                        ["日", "一", "二", "三", "四", "五", "六"][weekday]
                        }`;
                case "WW":
                    return [
                        "Sunday",
                        "Monday",
                        "TuesDay",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ][weekday];
            }
        }
    );
};

/**
 * @description 函数防抖
 * @param {Function} method 延时调用函数
 * @param {Number} wait 延迟时长
 * @param {Boolean} immediate 立即执行选项
 */
export const Ddebounce = (method, wait, immediate) => {
    if (typeof method != "function") {
        throw new TypeError("Expected a function");
    }
    let timeout;
    // Ddebounce函数为返回值
    // 使用Async/Await处理异步，如果函数异步执行，等待setTimeout执行完，拿到原函数返回值后将其返回
    // args为返回函数调用时传入的参数，传给method
    let Ddebounce = function (...args) {
        return new Promise(resolve => {
            // 用于记录原函数执行结果
            let result;
            // 将method执行时this的指向设为 debounce 返回的函数被调用时的this指向
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

    // 在返回的 Ddebounce 函数上添加取消方法
    Ddebounce.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };
    return Ddebounce;
};

/**
 * @method 节流
 * @param {*} func
 * @param {*} delay
 */
export const Dthrottle = (func, delay) => {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        if (!timer) {
            timer = setTimeout(function () {
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    };
};

/**
 * @method 数组扁平化
 * @param {*} arry
 */
export const deepFlatten = arr => {
    return arr.toString().split(",").map(item => +item);
    // or
    // return [].concat(...arr.map(item => (Array.isArray(item) ? deepFlatten(item) : item)));
};

/**
 * @method 判断类型
 * @param {*} obj
 * @returns
 */
export const toType = obj => {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};
