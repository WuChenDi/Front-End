const localStorage = window.localStorage
const sessionStorage = window.sessionStorage

// 设置localStorage存储数据
export const setLocal = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    localStorage.setItem(name, content)
}

// 获取localStorage存储数据
export const getLocal = name => {
    if (!name) return
    let value = localStorage.getItem(name)
    if (value !== null) {
        try {
            value = JSON.parse(value)
        } catch (error) {
            value = value
        }
    }
    return value
}

// 删除localStorage存储数据
export const removeLocal = name => {
    if (!name) return
    localStorage.removeItem(name)
}

// 设置sessionStorage存储数据
export const setSession = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content)
    }
    sessionStorage.setItem(name, content)
}

// 获取sessionStorage存储数据
export const getSession = name => {
    if (!name) return;
    let value = sessionStorage.getItem(name)
    if (value !== null) {
        try {
            value = JSON.parse(value)
        } catch (error) {
            value = value
        }
    }
    return value
}

// 删除sessionStorage存储数据
export const removeSession = name => {
    if (!name) return;
    sessionStorage.removeItem(name)
}

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
    return context == null || context == "" || context == "undefined" ? "" : context;
}

/**
 * @method 时间格式化
 * @param {string} time
 * @param {string} format yyyy/mm/dd hh:ii:ss(2019/07/24 09:45:43) yy/m/d hh:ii:ss(19/07/24 09:45:43) yyyy/mm/dd w(2019/07/24 星期三) mm/dd/yyyy(07/24/2019)
 * @returns
 */
export const formatTime = (time, format = 'yyyy-mm-dd') => {
    const d = time ? new Date(time) : new Date();
    const t = (i) => { return (i < 10 ? '0' : '') + i };

    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    const weekday = d.getDay();

    return format.replace(/(yy){1,2}|m{1,2}|d{1,2}|h{1,2}|i{1,2}|s{1,2}|w{1,2}/gi, function (r) {
        switch (r.toUpperCase()) {
            case 'YY':
                return ('' + year).substr(2);
            case 'YYYY':
                return year;
            case 'M':
                return month;
            case 'MM':
                return t(month);
            case 'D':
                return day;
            case 'DD':
                return t(day);
            case 'H':
                return hour;
            case 'HH':
                return t(hour);
            case 'I':
                return minutes;
            case 'II':
                return t(minutes);
            case 'S':
                return seconds;
            case 'SS':
                return t(seconds);
            case 'W':
                return `星期${['日', '一', '二', '三', '四', '五', '六'][weekday]}`;
            case 'WW':
                return ['Sunday', 'Monday', 'TuesDay', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][weekday];
        }
    });
}

/**
 * @method 防抖
 * @param {*} func 
 * @param {*} delay 
 * @param {*} immediate 
 */
export const Ddebounce = (func, delay, immediate) => {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        if (timer) clearTimeout(timer);
        if (immediate) {
            // 如果已经执行过，不再执行
            let doNow = !timer;
            timer = setTimeout(function () {
                timer = null;
            }, delay);
            if (doNow) {
                timer = setTimeout(function () {
                    func.apply(context, args);
                }, delay);
            }
        } else {
            timer = setTimeout(function () {
                func.apply(context, args);
            }, delay);
        }
    }
}

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
    }
}

/**
 * @method 数组扁平化
 * @param {*} arr 
 */
export const Dflatten = arr => {
    arr.toString().split(',').map((item) => +item);
}

