// 监听 popup.js 触发的信息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(request.cmd == 'getHref')
    sendResponse({ href: location.href });
});