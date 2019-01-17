1. 反转字符串
    ```js
    this.message = this.message.split('').reverse().join('');
    ```

2. 页面加载完后执行
    ```js
    $(function () { });
    $(document).ready(function () { });
    window.onload = function () { }
    ```

3. 页面间跳转
    ```js
    window.location.href = "http://www.baidu.com";
    window.location.replace("http://www.baidu.com");
    ```

4. 浏览器前进后退
    ```js
    history.forward();//前进
    history.back();//后退+刷新
    history.back(-1)//后退,直接返回当前页的上一页，数据全部消息，是个新页面
    history.go(1);//前进
    history.go(-1);//后退也是返回当前页的上一页，不过表单里的数据全部还在
    ```

5. 地址栏传参中文乱码
    ```js
    传: encodeURI(encodeURI(name));
    接: decodeURI(name)
    ```

6. 几种js外层写法
    ```js
    - jQuery(function () { }); 全写为 jQuery(document).ready(function () { });
      用于存放操作DOM对象的代码，执行其中代码时DOM对象已存在。
    - (function () { … })()和(function () { … }())是两种javascript立即执行函数的常见写法.
    ```

7. 获取当前鼠标坐标
    ```js
    var getCoordInDocumentExample = function () {
      var coords = document.getElementById("colorPanel");
      coords.onmousemove = function (e) {
        var pointer = getCoordInDocument(e);
        var coord = document.getElementById("colorText");
        coord.innerHTML = "X,Y=(" + pointer.x + ", " + pointer.y + ")";
      }
    }

    var getCoordInDocument = function (e) {
      e = e || window.event;
      var x = e.pageX || (e.clientX +
        (document.documentElement.scrollLeft ||
          document.body.scrollLeft));
      var y = e.pageY || (e.clientY +
        (document.documentElement.scrollTop ||
          document.body.scrollTop));
      return {
        'x': x,
        'y': y
      };
    }

    window.onload = function () {
      getCoordInDocumentExample();
    };
    ```

8. cookie.js的使用
    ```js
    $.cookie('empNo', empNo, { expires: 7 });//存
    $.cookie('empNo');//取
    ```

9. JS辨别访问浏览器判断是android还是ios系统
    ```js
    var ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      console.log("iphone");
    } else if (/android/.test(ua)) {
      console.log("android");
    }
    ```

10. ajax请求
    ```js
    $(function () {
      $.ajax({
        type: "post",
        async: true, //默认设置为true，所有请求均为异步请求。
        url: "http://www.idaima.com/xxxxx.php",
        data: {
          username: $("#username").val(),
          content: $("#content").val()
        },
        dataType: "json", //xml、html、script、jsonp、text
        beforeSend: function () { },
        complete: function () { },
        success: function (data) {
          console.log(data)
        },
        error: function () { }
      })
    })
    ```

11. 如何获取checkbox，并判断是否选中
    ```js
    $("input[type='checkbox']").is(':checked') //返回结果：选中=true，未选中=false

    12.获取checkbox选中的值
    var chk_value = [];
    $('input[name="test"]:checked').each(function () {
      chk_value.push($(this).val());
    });
    ```

13. checkbox全选 / 反选 / 选择奇数
    ```js
    $("document").ready(function () {
      $("#btn1").click(function () {
        $("[name='checkbox']").attr("checked", 'true'); //全选 
      }) $("#btn2").click(function () {
        $("[name='checkbox']").removeAttr("checked"); //取消全选 
      }) $("#btn3").click(function () {
        $("[name='checkbox']:even").attr("checked", 'true'); //选中所有奇数 
      }) $("#btn4").click(function () {
        $("[name='checkbox']").each(function () { //反选 
          if ($(this).attr("checked")) {
            $(this).removeAttr("checked");
          } else {
            $(this).attr("checked", 'true');
          }
        })
      })
    })
    ```

14. 获取select下拉框的值
    ```js
    $("#select").val()
    ```

15. 获取选中值，三种方法都可以
    ```js
    $('input:radio:checked').val() ；
    $("input[type='radio']:checked").val();
    $("input[name='rd']:checked").val();
    ```

16. jQuery中几个自定义的事件
    ```js
    - hover(fn1, fn2) ：一个模仿悬停事件（鼠标移动到一个对象上面及移出这个对象）的方法。
    当鼠标移动到一个匹配的元素上面时，会触发指定的第一个函数。当鼠标移出这个元素时，
    会触发指定的第二个函数。
    - ready(fn): 当DOM载入就绪可以查询及操纵时绑定一个要执行的函数。
    - toggle(evenFn, oddFn): 每次点击时切换要调用的函数。如果点击了一个匹配的元素，
    则触发指定的第一个函数，当再次点击同一元素时，则触发指定的第二个函数。
    随后的每次点击都重复对这两个函数的轮番调用。
    - trigger(eventtype): 在每一个匹配的元素上触发某类事件。
    - bind(eventtype, fn) ，unbind(eventtype): 事件的绑定与反绑定
    ```

17. 屏幕旋转的事件和样式
    ```js
    function orientInit() {
      var orientChk = document.documentElement.clientWidth > document.documentElement.clientHeight ? 'landscape' : 'portrait';
      if (orientChk == 'lapdscape') {
        //这里是横屏下需要执行的事件
      } else {
        //这里是竖屏下需要执行的事件
      }
    }
    orientInit();
    window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', function () {
      setTimeout(orientInit, 100);
    }, false)
    ```

18. 软键盘弹出影响定位
    ```js
    fixed定位
    1.ios下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位
    2.android下fixed表现要比iOS更好，软键盘弹出时，不会影响fixed元素定位
    3.ios4下不支持position: fixed
    解决方案：使用[Iscroll](http://cubiq.org/iscroll-5)，如：
      <div id="wrapper">
        <ul>
          <li></li>
          .....
            </ul>
      </div>
      <script src="iscroll.js"></script>
      <script>
        var myscroll;
        function loaded(){
          myscroll = new iScroll("wrapper");
        }
        window.addEventListener("DOMContentLoaded",loaded,false);
    </script>
    position定位
    Android下弹出软键盘弹出时，影响absolute元素定位
    解决方案:
    var ua = navigator.userAgent.indexOf('Android');
    if (ua > -1) {
      $('.ipt').on('focus', function () {
        $('.css').css({ 'visibility': 'hidden' })
      }).on('blur', function () {
        $('.css').css({ 'visibility': 'visible' })
      })
    }
    ```

19. js判断微信浏览器
    ```js
    function isWeixin() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    }
    ```

20. 全部替换字符串里的某个元素
    ```js
    deadDay.replace(/-/g, "");//"-"全部去掉
    ```

21. 获取当前国家省市(新浪的接口)
    ```js
    $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',
      function () {
        alert(remote_ip_info.country);//国家  
        alert(remote_ip_info.province);//省份  
        alert(remote_ip_info.city);//城市  
      });
    ```

22. 获取本周日期
    ```js
    var now = new Date();
    var start = new Date();
    var n = now.getDay();
    for (var i = 1; i <= 7; i++) {
      var day = start.setDate(now.getDate() - n + i);
      day = new Date(day);
      day = day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
      console.log(day);
    }
    ```

23. 在JavaScript中，所有的对象都是不相等的，每一个都是独立的对象实例, 这是一个非常重要的特性.

24. 获取客户端IP方法
var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
$.getJSON(url, function (data) {
  alert(data.Ip);
});

25. 获取随机颜色
item.style.backgroundColor = '#' + Math.random().toString(16).slice(2, 8);

26. 将类数组对象转化为数组（只是包含“数字”键及其键值）
var arr = [].slice.call(NodeLisr, 0),

27. 手机号截取
phone.substr(0, 3) + "****" + phone.substr(7, 11)