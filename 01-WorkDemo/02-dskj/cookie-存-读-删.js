var apiurl = "http://result.eolinker.com/zK8UvSA1d3aeaeb375e18450d7597503427b5f17b0e519c?uri=";

// var Token = localStorage.getItem('Token');
var Token = getCookie('Token');

// 存cookies
function setCookie(name, value, time) {
  var strsec = getsec(time);
  var exp = new Date();
  exp.setTime(exp.getTime() + strsec * 1);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

// 读取cookies
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

// 删除cookie
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function getsec(str) {
  // alert(str);
  var str1 = str.substring(1, str.length) * 1;
  var str2 = str.substring(0, 1);
  if (str2 == "s") {
    return str1 * 1000;
  }
  else if (str2 == "h") {
    return str1 * 60 * 60 * 1000;
  }
  else if (str2 == "d") {
    return str1 * 24 * 60 * 60 * 1000;
  }
}
// 使用说明：
// s是指秒，如60秒则是：s60
// h是指小时，如12小时则是：h12
// d是天数，30天则：d30
// demo
// setCookie("name", "hayden", "s20");
