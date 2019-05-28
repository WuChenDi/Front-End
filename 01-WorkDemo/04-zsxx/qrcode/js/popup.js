window.onload = function () {

  // 向 content-script 发消息
  function sendMessageToContentScript (message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
        callback && callback(response);
      });
    });
  }

  //  二维码的内容文本框
  var input = document.getElementById('qr-value');
  // 二维码存放内容
  var qrcodeDOM = document.getElementById('qrcode');
  
  // 生成二维码
  function renderQrcode (value) {
    new QRCode(qrcodeDOM, value);
  }
  
  // 获取页面URL， 初始化 二维码
  sendMessageToContentScript({ cmd:'getHref' }, function (response) {
    input.value = (response && response.href) || 'http://www.cerien.cn';
    renderQrcode(response.href);
  });
  
  // 生成新的二维码
  document.getElementById('get-code').addEventListener('click', function () {
    // 清空旧二维码
    qrcodeDOM.innerHTML = '';
    // 重新生成
    renderQrcode(input.value);
  }, false)
  
}
