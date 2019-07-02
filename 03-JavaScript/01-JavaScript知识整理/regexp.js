// 常用正则整理

{
    // 判断电话号码
    function isPhone(tel) {
        var regx = /^1[34578]\d{9}$/;
        return regx.test(tel);
    }
}

{
    // JS实现千位分隔符
    function format(number) {
        var regx = /\d{1,3}(?=(\d{3})+$)/g;
        return (number + '').replace(regx, '$&,')  // $&表示与regx相匹配的字符串
    }

    // 格式化金钱
    const ThousandNum = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const money = ThousandNum(19941112);
    // money => "19,941,112"
}

{
    // 验证邮箱
    function isEmail(email) {
        var regx = /^([a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-])+$/;
        return regx.test(email);
    }
}

{
    // 验证身份证号码
    // 身份证号码可能为15位或18位，15位为全数字，18位中前17位为数字，最后一位为数字或者X
    function isCardNo(number) {
        var regx = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return regx.test(number);
    }
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
    // 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    var regx = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
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