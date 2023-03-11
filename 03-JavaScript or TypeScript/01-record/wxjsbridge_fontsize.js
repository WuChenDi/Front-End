
// remove
// <meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">？</meta>

// Android
(function () {
  function handleFontSize() {
    // 设置网页字体为默认大小
    WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
    WeixinJSBridge.on('menu:setfont', function () {
      // 重写设置网页字体大小的事件
      WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
    });
  }

  // 绑定WeixinJSBridgeReady事件，当WeixinJSBridge对象可用时，立即执行handleFontSize
  if (typeof WeixinJSBridge === "object" && typeof WeixinJSBridge.invoke === "function") {
    handleFontSize();
  } else if (document.addEventListener) {
    document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
  } else if (document.attachEvent) {
    document.attachEvent("WeixinJSBridgeReady", handleFontSize);
    document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
  }
})();

// IOS
// body {
//   -webkit-text-size-adjust: 100% !important;
//   text-size-adjust: 100% !important;
//   -moz-text-size-adjust: 100% !important;
// }
