// 常用正则整理

{
    /**
     * @description 判断手机号码
     * @param {String|Number} tel
     * @returns {Boolean} 
     */
    function isPhoneNum(tel) {
        return /^1[34578]\d{9}$/.test(tel);
    }

    /**
     * @description 判断是否为手机号 (百度)
     * @param  {String|Number} tel
     * @returns {Boolean} 
     */
    function isPhoneNum(tel) {
        return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(tel)
    }

    /**
     * @description 手机号(严谨), 根据工信部2019年最新公布的手机号段
     * @param  {String|Number} tel
     * @returns {Boolean} 
     */
    function isPhoneNum(tel) {
        return /^1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/.test(tel);
    }
}

{
    /**
     * @description 判断是否为邮箱地址
     * @param {String} email
     * @returns {Boolean} 
     */
    function isEmail(email) {
        return /^([a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-])+$/.test(email);
    }
}

{
    /**
     * @description 验证身份证号码(身份证号码可能为15位或18位，15位为全数字，18位中前17位为数字，最后一位为数字或者X)
     * @param {String} idCard
     * @returns {Boolean} 
     */
    function isCardNo(idCard) {
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard);
    }

    /**
     * @description 验证身份证号码
     * @param {String} idCard
     * @returns {Boolean} 
     */
    function isIDCard(idCard) {
        return /(^\d{8}(0\d|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(idCard)
    }
}

{
    // 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合
    var regx = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
}

{
    // 去除首尾的'/'
    var str = '/asdf//';
    str = str.replace(/^\/*|\/*$/g, '');
}

{
    // 判断日期格式是否符合 '2017-05-11'的形式，简单判断，只判断格式
    var regx = /^\d{4}\-\d{1,2}\-\d{1,2}$/

    // 判断日期格式是否符合 '2017-05-11'的形式，严格判断（比较复杂）
    var regx = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
}

{
    // 用户名正则
    var regx1 = /^[a-zA-Z0-9_-]{4,16}$/;

    // 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    var regx2 = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
}

{
    // 车牌号正则
    var regx = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
}

{
    // 过滤HTML标签
    var str = "<p>dasdsa</p>nice <br> test</br>"
    var regx = /<[^<>]+>/g;
    str = str.replace(regx, '');
}

{
    // URL正则
    var regx = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    // 合法uri
    function validateURL(textval) {
        const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
        return urlregex.test(textval)
    }

    // 操作URL查询参数
    const params = new URLSearchParams(location.search.replace(/\?/ig, "")); // location.search = "?name=yajun&sex=female"
    params.has("yajun"); // true
    params.get("sex"); // "female"
}

{
    // 生成随机HEX色值
    const RandomColor = () => "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
    const color = RandomColor();
    // color => "#f03665"
}

{
    // 生成星级评分
    const StartScore = rate => "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
    const start = StartScore(3);
    // start => "★★★"
}

{
    // 新能源车牌号
    var regx1 = /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/;

    // 非新能源车牌号
    var regx2 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;

    // 车牌号(新能源+非新能源)
    var regx3 = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/;
}

{
    /**
     * @description 千位分隔符(格式化金钱)
     * @param {String|Number} num
     * @returns {string} 
     */
    function thousandNum(num) {
        var regx = /\d{1,3}(?=(\d{3})+$)/g;
        return (num + '').replace(regx, '$&,')  // $&表示与regx相匹配的字符串
    }

    /**
     * @description 千位分隔符(格式化金钱)
     * @param {String|Number} num
     * @returns {string} 
     */
    function thousandNum(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    // thousandNum(123456789) => "123,456,789"
}

{
    /* 小写字母*/
    function validateLowerCase(str) {
        const reg = /^[a-z]+$/
        return reg.test(str)
    }

    /* 大写字母*/
    function validateUpperCase(str) {
        const reg = /^[A-Z]+$/
        return reg.test(str)
    }

    /* 大小写字母*/
    function validatAlphabets(str) {
        const reg = /^[A-Za-z]+$/
        return reg.test(str)
    }
}

{
    //  判断是否为空
    function validatenull(val) {
        if (typeof val === 'boolean') {
            return false
        }
        if (val instanceof Array) {
            if (val.length === 0) return true
        } else if (val instanceof Object) {
            if (JSON.stringify(val) === '{}') return true
        } else {
            if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
            return false
        }
        return false
    }
}
