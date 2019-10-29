```js
// jquery 封装 localStorage, sessionStorage, cookie
var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", "//code.jquery.com/jquery-1.8.3.min.js");
var heads = document.getElementsByTagName("head");
if (heads.length) heads[0].appendChild(script);
else document.documentElement.appendChild(script);
script.onload = function() {
    (function() {
        $.extend({
            isJson: function(str) {
                if ($.type(str) == "string") {
                    try {
                        var obj = JSON.parse(str);
                        if ($.type(obj) == "object" && obj) {
                            return true;
                        } else {
                            return false;
                        }
                    } catch (e) {
                        //console.log('error：'+str+'!!!'+e);
                        return false;
                    }
                }
                return false;
            },
            storage: function(name, value, expire) {
                // expire 参数 格式 {expire : 1} 注：expire.expire 的值 等于过期时间减去当前时间， 一个大于0的值，单位毫秒。
                //判断全局是否过期
                var expires = JSON.parse(localStorage.getItem("expire")) || {
                    expire: 0
                };
                if (expires.expire && expires.expire < new Date().getTime())
                    this.removeStorage();
                //没有参数时，返回原生 localStorage
                if (arguments.length == 0) return localStorage;
                if (arguments[0] == null || arguments[0] == "") return;
                if (
                    name &&
                    name in expires &&
                    expires[name] &&
                    expires[name] < new Date().getTime()
                ) {
                    this.removeStorage(name);
                    delete expires[name];
                    localStorage.setItem("expire", JSON.stringify(expires));
                }
                if (arguments.length == 1) {
                    if ($.type(arguments[0]) == "string") {
                        //只有一个字符串参数 'expire' 时 返回全局的过期时间
                        if (arguments[0] == "expire" || arguments[0] == ":")
                            return expires.expire;
                        //只有一个字符串参数 'expires' 时 返回json数据 所有的过期时间  包含全局
                        if (arguments[0] == "expires" || arguments[0] == "::")
                            return expires;
                        //只有一个字符串参数 以冒号或双冒号开头的字符串 冒号后面是要查找到 [name] 返回[name]的过期时间
                        if (/^:{1,2}[\w-]+$/.test(arguments[0])) {
                            name = arguments[0].replace(/^:{1,2}([\w-]+)$/);
                            if (name in expires && expires.name)
                                return expires[name];
                            return 0;
                        }
                        //只有一个字符串参数时，返回当前的值
                        var ret = localStorage.getItem(name);
                        if (this.isJson(ret)) ret = JSON.parse(ret);
                        return ret;
                    }
                    //只有一个 json对象参数并且它包含expire属性
                    if (
                        $.type(arguments[0]) == "object" &&
                        "expire" in arguments[0] &&
                        arguments[0].expire
                    ) {
                        //值为字符串时 字符串是要查找到 [name] 返回[name]的过期时间
                        if ($.type(arguments[0].expire) == "string") {
                            name = arguments[0].expire;
                            if (name in expires && expires.name)
                                return expires[name];
                            return 0;
                        }
                        //值为数字时 设置全局过期时间
                        if ($.type(arguments[0].expire) == "number") {
                            expires.expire =
                                new Date().getTime() + arguments[0].expire;
                            localStorage.setItem(
                                "expire",
                                JSON.stringify(expires)
                            );
                        }
                    }
                }
                //有2个参数 第1个是字符串，第2个是 expire对象时
                if (
                    arguments.length == 2 &&
                    $.type(arguments[0]) == "string" &&
                    arguments[0] != "" &&
                    $.type(arguments[1]) == "object" &&
                    Object.keys(arguments[1]).length == 1 &&
                    "expire" in arguments[1]
                )
                    expire = arguments[1].expire;
                //保存当前 expire
                if (expire && $.type(expire) == "object") {
                    expires[name] = new Date().getTime() + expire.expire;
                    localStorage.setItem("expire", JSON.stringify(expires));
                }
                if (value == null || value == "") return this;
                if ($.type(value) == "object" || $.type(value) == "array")
                    value = JSON.stringify(arguments[1]);
                localStorage.setItem(name, value);
                return this;
            },
            removeStorage: function(name) {
                if (name == null) localStorage.clear();
                else localStorage.removeItem(name);
                return this;
            },
            session: function(name, value) {
                if (name == null) return sessionStorage; //没有参数时，返回原生 sessionStorage
                if (value == null) {
                    var ret = sessionStorage.getItem(name);
                    if (this.isJson(ret)) ret = JSON.parse(ret);
                    return ret;
                }
                if ($.type(value) == "object" || $.type(value) == "array")
                    value = JSON.stringify(value);
                sessionStorage.setItem(name, value);
                return this;
            },
            removeSession: function(name) {
                if (name == null) sessionStorage.clear();
                else sessionStorage.removeItem(name);
                return this;
            },
            cookie: function(name, value, options) {
                var cookie = document.cookie.replace(" ", "");
                //当没有参数时 返回原生 cookie 对象
                if (arguments.length == 0) return unescape(cookie);
                if (name == null || $.type(name) != "string" || name == "")
                    return;
                //当只有一个参数时 返回 value 值, 当第二参数为布尔型时 true : 返回 json 所有数据。 false : 与一个参数时相同。
                if (
                    arguments.length == 1 ||
                    (arguments.length == 2 && $.type(arguments[1]) == "boolean")
                ) {
                    var json = {};
                    $.each(cookie.split(";"), function(i, str) {
                        var arr = str.split("=");
                        json[arr[0]] = unescape(arr[1]);
                    });
                    if (arguments.length == 2 && arguments[1]) return json;
                    //读取 name 值
                    var ret = unescape(json[name]);
                    //如果是JSON字符串，转成JSON对象
                    if (this.isJson(ret)) ret = JSON.parse(ret);
                    return ret;
                }
                //以下是写入cookie
                var str = ";";
                // json { domain : '', path : '', expires : 0, secure : '' } expire 或  expires 都可以  单位豪秒
                // expire 或  expires  参数 格式 {expire : 1}   注：expire.expire 的值 等于过期时间减去当前时间， 一个大于0的值，单位毫秒。
                if (options || $.type(options) == "object") {
                    //把 expire 属性 修正为 expires
                    if (
                        "expire" in options &&
                        options.expire &&
                        $.type(options.expire) == "number"
                    ) {
                        options.expires = options.expire;
                        delete options.expire;
                    }
                    //处理过期时间，单位毫秒
                    if (
                        "expires" in options &&
                        options.expires &&
                        $.type(options.expires) == "number"
                    ) {
                        var exp = new Date();
                        exp.setTime(exp.getTime() + options.expires);
                        options.expires = exp.toGMTString();
                    }
                    for (var key in options) {
                        str += key + "=" + options[key] + ";";
                    }
                }
                document.cookie = name + "=" + escape(value) + str;
                return this;
            },
            removeCookie: function(name, options) {
                return this.cookie(
                    name,
                    "",
                    $.extend(options, {
                        expires: -1
                    })
                );
            }
        });
    })(jQuery);

    $.storage("a", "localStorage");
    console.log($.storage("a"));
    $.removeStorage("a");
    console.log($.storage("a"));

    $.session("b", "sessionStorage");
    console.log($.session("b"));
    $.removeSession("b");
    console.log($.session("b"));

    $.cookie("c", "cookie");
    console.log($.cookie("c"));
    $.removeCookie("c");
    console.log($.cookie("c"));
};
```
