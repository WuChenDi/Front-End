//wuchendi

//1.js的分层(功能) : jquery(tools)  组件(ui)  应用(app), mvc(backboneJs)
//2.js的规划(管理) : 避免全局变量和方法(命名空间，闭包，面向对象) , 模块化(seaJs,requireJs)

window.onload = function() {
	mv.app.toTips();    //点击返回顶部
	mv.app.toDis();		//显示隐藏
	mv.app.toBanner();  //banner轮播
	mv.app.toMarquee(); //无缝滚动
};
var mv = {};

mv.tools = {};

//封装
//获取Class
mv.tools.getByClass = function(oParent, sClass) {
	var aEle = oParent.getElementsByTagName('*');
	var arr = [];

	for (var i = 0; i < aEle.length; i++) {
		if (aEle[i].className == sClass) {
			arr.push(aEle[i]);
		}
	}

	return arr;
};

mv.tools.getStyle = function(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
};

mv.ui = {};

//淡入
mv.ui.fadeIn = function(obj) {

	var iCur = mv.tools.getStyle(obj, 'opacity');
	if (iCur == 1) {
		return false;
	}

	var value = 0; //设置初始透明度
	clearInterval(obj.timer); //清除定时器
	obj.timer = setInterval(function() {
		var iSpeed = 5;
		if (value == 100) {
			clearInterval(obj.timer);
		} else {
			value += iSpeed;
			obj.style.opacity = value / 100;
			obj.style.filter = 'alpha(opacity=' + value + ')'; //兼容
		}
	}, 30);

};

//淡出
mv.ui.fadeOut = function(obj) {

	var iCur = mv.tools.getStyle(obj, 'opacity');
	if (iCur == 0) {
		return false;
	}

	var value = 100;
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var iSpeed = -5;
		if (value == 0) {
			clearInterval(obj.timer);
		} else {
			value += iSpeed;
			obj.style.opacity = value / 100;
			obj.style.filter = 'alpha(opacity=' + value + ')';
		}
	}, 30);

};

mv.ui.moveLeft = function(obj, old, now) {

	clearInterval(obj.timer); //清除旧的定时器，防止累加
	obj.timer = setInterval(function() {

		var iSpeed = (now - old) / 10;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

		if (now == old) {
			clearInterval(obj.timer);
		} else {
			old += iSpeed;
			obj.style.left = old + 'px';
		}

	}, 30);

};

mv.app = {};


//点击返回顶部
mv.app.toTips = function(){
	var oAlong = document.getElementById('along');
	var oFeeds = document.getElementById('feeds');
	var clienHeight = document.documentElement.clientHeight;//获取可视区域的高度
	
	var timer = null;
	var isTop = true;//用于判断是否到达顶部
	
	//滚动条滚动事件
	window.onscroll = function(){
		var osTop = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动条的滚动高度
		console.log(osTop+"/"+clienHeight);
		//如果滚动高度大于可视区域高度，则显示回到顶部按钮
		if(osTop / clienHeight){
			oAlong.style.display = 'block';
			oFeeds.style.display = 'block';
		}else{ 	//否则隐藏
			oAlong.style.display = 'none';
			oFeeds.style.display = 'none';
		}
		 //判断当点击回到顶部按钮后 滚动条在回滚过程中，若手动滚动滚动条，则清除定时器
		if(!isTop){
            clearInterval(timer);
        }
		isTop = false;
	}
	//回到顶部按钮点击事件
	oAlong.onclick = function(){
		clearInterval(timer);
		timer = setInterval(function(){
			var osTop = document.documentElement.scrollTop || document.body.scrollTop;
			var speed = Math.floor((-osTop)/6);//设置速度差，产生缓动的效果
			document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
			//document.documentElement.scrollTop = osTop + speed;
			//document.body.scrollTop = osTop + speed;
			isTop = true; //阻止滚动事件清除定时器 
			if(osTop == 0){
				clearInterval(timer);
			}
		},30);
	}
}

//显示隐藏
mv.app.toDis = function(){
	var oA1 = document.getElementById('a1');
	var oA2 = document.getElementById('a2');
	
	var timer = null;
	
	oA1.onmousemove = function(){
		clearTimeout(timer);
		oA2.style.display = 'block';
	}
	
	oA1.onmouseout = function(){
		timer = setTimeout(function(){
			oA2.style.display = 'none';
		},500);
	}
	
	oA2.onmousemove = function(){
		clearTimeout(timer);
	};
	oA2.onmouseout = function(){
		timer = setTimeout(function(){
			oA2.style.display = 'none';
		},500);
	}
};

//banner轮播
mv.app.toBanner = function() {
	var oDd = document.getElementById('ad');
	var aLi = oDd.getElementsByTagName('li');

	var oPrevBg = mv.tools.getByClass(oDd, 'prev_bg')[0]; //获取class，左右透明度
	var oNextBg = mv.tools.getByClass(oDd, 'next_bg')[0];

	var oPrev = mv.tools.getByClass(oDd, 'prev')[0]; //左右两边箭头
	var oNext = mv.tools.getByClass(oDd, 'next')[0];

	var iNow = 0; //定义标识，自行累加

	var timer = setInterval(auto, 3000); //定时器，自动播放

	//自动播放（右走）
	function auto() {

		//累加算法
		if (iNow == aLi.length - 1) {
			iNow = 0;
		} else {
			iNow++;
		}

		for (var i = 0; i < aLi.length; i++) {
			mv.ui.fadeOut(aLi[i]); //淡出
		}

		mv.ui.fadeIn(aLi[iNow]); //淡入

	}

	//自动播放（左走）
	function autoPrev() {

		if (iNow == 0) {
			iNow = aLi.length - 1;
		} else {
			iNow--;
		}

		for (var i = 0; i < aLi.length; i++) {
			mv.ui.fadeOut(aLi[i]);
		}

		mv.ui.fadeIn(aLi[iNow]);

	}

	//移到左侧有个箭头出现
	//oPrevBg.onmouseover = oPrev.onmouseover 因为 a 和 span 是两个分离的 ，移到其中一个必然触发事件所导致的抖动
	oPrevBg.onmouseover = oPrev.onmouseover = function() {
		oPrev.style.display = 'block';
		clearInterval(timer);
	};

	//移到右侧有个箭头出现
	oNextBg.onmouseover = oNext.onmouseover = function() {
		oNext.style.display = 'block';
		clearInterval(timer);
	};

	//移开时自动隐藏（左）
	oPrevBg.onmouseout = oPrev.onmouseout = function() {
		oPrev.style.display = 'none';
		timer = setInterval(auto, 3000); //移开自动播放
	};

	//移开时自动隐藏（右）
	oNextBg.onmouseout = oNext.onmouseout = function() {
		oNext.style.display = 'none';
		timer = setInterval(auto, 2000); //移开自动播放
	};

	//点击切换
	oPrev.onclick = function() {
		autoPrev();
	};

	//点击切换
	oNext.onclick = function() {
		auto();
	};

};

//无缝滚动
mv.app.toMarquee = function() {
	var oBg = document.getElementById('slideShow_bg');
	var oUl = oBg.getElementsByTagName('ul')[0];
	var aLi = oUl.getElementsByTagName('li');
	var speed = 2;

	oUl.innerHTML += oUl.innerHTML;
	oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';

	function move() {
		if (oUl.offsetLeft < -oUl.offsetWidth / 2) {
			oUl.style.left = '0';
		}
		if (oUl.offsetLeft > 0) //往右边滚动
		{
			oUl.style.left = -oUl.offsetWidth / 2 + 'px';
		}
		oUl.style.left = oUl.offsetLeft + speed + 'px';
		//oUl.style.left=oUl.offsetLeft-2+'px';//往左边滚动,就是-2中的正负决定的反向
	}

	var timer = setInterval(move, 30);
	oBg.onmouseover = function() {
		clearInterval(timer);
	}
	oBg.onmouseout = function() {
		timer = setInterval(move, 30);
	}
	document.getElementById('prev_bg').onclick = function() //点击往左边
		{
			speed = -2;
		}
	document.getElementById('next_bg').onclick = function() //点击往左边
		{
			speed = 2;
		}

};