var cookie = {
    get: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    set: function (name, value, time) {
        var exp = new Date();

        if (time == undefined)
            time = 30 * 24 * 60 * 60 * 1000;

        exp.setTime(exp.getTime() + time);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    del: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}
