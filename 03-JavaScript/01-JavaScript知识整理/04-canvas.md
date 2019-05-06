 ```js
    /**
     * 业务场景：
     * 微信小程序利用canvas生成海报分享图片
     * 唯一一个不同点在于，要根据返回list算canvas的高度(也就是高度是不确定的，图片可以无限长)
     * */

    // 页面结构
    <block>
        <view class="dire-content" wx:if="{{postersShow}}" catchtouchmove="donMove">
            <scroll-view scroll-y class="dire-scroll">
                <canvas class="inviteCanvas" canvas-id="inviteCanvas" style="width:{{canvasWidth}}rpx;height:{{canvasHeight}}rpx;"> </canvas>
                <image class="canvasimg" src="{{canvasImg}}" style="width:630rpx;height:{{canvasHeight}}rpx"></image>
            </scroll-view>
        </view>
        <view class="create-poster-wbtn" bindtap="saveInviteCard" wx:if="{{postersShow}}">保存到手机</view>
    </block>

    const app = getApp();

    var that;
    var articleApps = require('../../banyan/logics/articleApps');
    var promise = require("../../vendor/lib/promise.min.js");
    
    Page({
    
        data: {
            resultList: [],
            img: "",
            showModal: false, // 遮罩层
            showWeekly: false, // 分享
            postersShow: false, // 生成海报
            canWidth: Number,
            canHeight: Number
        },
    
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
            that = this;
            let wkid = options.wkid;
            // let wkid = 8;
            // let title = "生命周期函数--监听页面加载生命周期函数--监听页面加载"
            that.setData({
                wkid: wkid,
                title: options.title
                // title: title
            })
            that.getWeeklyList(wkid);
    
            // 扫码场景处理
            var scene = options.scene ? decodeURIComponent(options.scene) : false;
            console.log(options);
            if (scene) {
                let param = scene.split(',');
                let wkidKey = param[0];
                // let wkidValue = param[1];
                if (param.length > 1 && wkidValue !== null) {
                    that.getWeeklyList(wkidKey);
                } else {
                    wx.switchTab({
                        url: '/pages/index/index',
                    });
                }
            }
        },
    
        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {
            that.setData({
                resultList: [],
                img: "",
                showModal: false,
                showWeekly: false,
                postersShow: false,
            })
            if (!app.globalData.userInfo) {
                app.getCurrentUser(res => {
                    that.getWeeklyList(that.data.wkid)
                }, 2);
            } else {
                that.getWeeklyList(that.data.wkid)
            }
        },
    
        // 加载页面数据
        getWeeklyList(id) {
            let reqData = {
                wkid: id
            }
            articleApps.weeklyList({
                data: reqData
            }, that, data => {
                that.setData({
                    resultList: data.list,
                    img: data.qrcode
                })
                that.dowloadImgFiles(that.data.img);
            });
        },
    
    
        // 显示分享弹框
        share() {
            that.setData({
                showModal: true,
                showWeekly: true
            })
        },
    
        // 显示canvas海报
        posters() {
            that.setData({
                showModal: true,
                showWeekly: false,
                postersShow: true,
            })
            that.getCanvasSize();
            that.drawInviteCard();
        },
    
        // 关闭分享弹框
        unShow() {
            that.setData({
                showModal: false,
                showWeekly: false,
                postersShow: false
            })
        },
    
        // 下载图片
        downloadImage: function (url) {
            var ulpromise = new promise(function (resolve, reject) {
                wx.downloadFile({
                    url: url,
                    success: function (res) {
                        resolve(res);
                    },
                    fail: function (e) {
                        reject(e);
                        console.log('download image failed');
                    }
                });
            });
            return ulpromise;
        },
    
        // 下载图片到缓存
        dowloadImgFiles(img) {
            try {
                var imgArr = [];
                that.downloadImage(img).then(function (res) {
                    imgArr.push(res.tempFilePath);
                    that.data.imgArr = imgArr;
                    return that.downloadImage(img);
                }.bind(this)).then(function (res) {
                    that.getCanvasSize();
                    that.drawInviteCard();
                });
            } catch (err) {
                console.log(err)
                that.setData({
                    loaded: true,
                });
                app.ulToast('加载失败', 0);
            }
        },
    
        // 获取画布宽高
        getCanvasSize() {
            wx.getSystemInfo({
                success(res) {
                    that.setData({
                        canWidth: res.windowWidth,
                        canHeight: res.windowHeight
                    })
                }
            });
        },
    
        // 绘制邀请卡画布
        drawInviteCard(callback) {
            let imgArr = that.data.imgArr;
            let con = that.data.resultList;
            // 文本list添加序号
            for (let j = 0; j < con.length; j++) {
                con[j].index = j;
            }
            let ctx = wx.createCanvasContext('inviteCanvas');
    
            // 设置单个主体内容高度
            let _height = 190;
    
            // 绘制白色背景
            ctx.setFillStyle('#fff');
            ctx.fillRect(0, 0, that.changeRpx(630), (that.changeRpx(_height) * con.length + that.changeRpx(600)));
            // ctx.clip(); //剪切矩形后 开始画画
            ctx.fill();
            that.setData({
                canvasWidth: that.changeRpx(630) * 2,
                // canvasHeight: Math.round((that.changeRpx(_height) * con.length + that.changeRpx(680)) * 2)
                canvasHeight: (95 * con.length + 300) * 2
            })
    
            // 文本标题
            // let title = "本周报告更新目录";
            let title = that.data.title;
            ctx.beginPath();
            ctx.setFillStyle('#000');
            ctx.font = "bold 16px Arial";
            // ctx.fillText(title, that.changeRpx(60), that.changeRpx(104));
            that.drawText(ctx, title, that.changeRpx(60), that.changeRpx(104), that.changeRpx(530), that.changeRpx(32), 1);
    
    
            // 以下为研究中心本期更新内容
            let title_two = "以下为研究中心本期更新内容";
            ctx.beginPath();
            ctx.setFontSize(that.changeRpx(28));
            ctx.setFillStyle('#747474');
            ctx.font = "nobold 14px Arial";
            ctx.fillText(title_two, that.changeRpx(60), that.changeRpx(150));
    
            // canvas主体内容
            for (let i = 0; i < con.length; i++) {
                // 标题
                let con_title = con[i].index + 1 + '.' + con[i].Title;
                ctx.beginPath();
                ctx.setFillStyle('#000');
                ctx.font = "bold 16px Arial";
                that.drawText(ctx, con_title, that.changeRpx(60), that.changeRpx(_height) * i + that.changeRpx(260), that.changeRpx(530), that.changeRpx(40), 2);
    
                // 内容
                let con_content = con[i].Summary;
                ctx.beginPath();
                ctx.setFillStyle('#747474');
                ctx.font = "nobold 14px Arial";
                // 判断10的用意是因为第二行是摘要，要缩略与标题保持一致
                if (i < 10) {
                    that.drawText(ctx, con_content, that.changeRpx(90), that.changeRpx(_height) * i + that.changeRpx(340), that.changeRpx(470), that.changeRpx(32), 3);
                } else {
                    that.drawText(ctx, con_content, that.changeRpx(110), that.changeRpx(_height) * i + that.changeRpx(340), that.changeRpx(470), that.changeRpx(32), 3);
                }
    
                // // 设置文本之间距离
                // let distance = that.changeRpx(160);
                // // 线框
                // ctx.moveTo(that.changeRpx(40), that.changeRpx(200) + i * distance);
                // ctx.lineTo(that.changeRpx(600), that.changeRpx(200) + i * distance);
                // ctx.lineTo(that.changeRpx(600), that.changeRpx(340) + i * distance);
                // ctx.lineTo(that.changeRpx(40), that.changeRpx(340) + i * distance);
                // ctx.lineTo(that.changeRpx(40), that.changeRpx(340) + i * distance);
                // ctx.closePath(); //闭合路径
                // ctx.lineWidth = 1;
                // ctx.strokeStyle = '#F6F6F6';
                // ctx.stroke();
            }
    
            // 小程序二维码
            ctx.beginPath();
            ctx.drawImage(imgArr[0], that.changeRpx(230), ((that.changeRpx(_height) * con.length) + that.changeRpx(260)), that.changeRpx(172), that.changeRpx(172));
            ctx.draw();
    
            setTimeout(() => {
                that.downloadCanvasImg(0, 0, that.changeRpx(630), (that.changeRpx(_height) * con.length + that.changeRpx(600)), (that.changeRpx(630) * 2), ((that.changeRpx(_height) * con.length + that.changeRpx(630)) * 2));
            }, 500);
        },
    
        // 图片
        // downloadCanvasImg(画布区域的左上角横坐标,画布区域的左上角纵坐标,画布区域的宽度,画布区域的高度,图片的宽度,图片的高度)
        downloadCanvasImg(x, y, width, height, destWidth, destHeight) {
            wx.canvasToTempFilePath({
                x: x,
                y: y,
                width: width,
                height: height,
                destWidth: destWidth,
                destHeight: destHeight,
                canvasId: 'inviteCanvas',
                fileType: 'jpg',
                quality: 2,
                success(res) {
                    console.log(res)
                    let filePath = res.tempFilePath;
                    that.setData({
                        canvasImg: filePath
                    })
                },
                fail(err) {
                    console.log(err);
                }
            });
        },
    
        // canvas文本居中 
        // centerText(canvas对象，要写的字，字体，颜色，绘制的高度)
        centerText(ctx, text, fontSzie, color, height) {
            ctx.font = fontSzie;
            ctx.fillStyle = color;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, ctx.width / 2, height);
        },
    
        // canvas文本超过隐藏 
        // drawText(canvas对象，文本，X轴，Y轴，文本宽度，行高，显示多少行)
        drawText(ctx, text, x, y, maxWidth, lineHeight, maxLine) {
            let arrText = text.split('');
            let line = '';
            let num = 1;
            for (let n = 0; n < arrText.length; n++) {
                let testLine = line + arrText[n];
                let metrics = ctx.measureText(testLine);
                let testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    if (maxLine != undefined && num >= maxLine) {
                        ctx.fillText(line.substr(0, line.length - 1) + '...', x, y);
                        return num;
                    }
                    num++;
                    ctx.fillText(line, x, y);
                    line = arrText[n];
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, x, y);
            return num;
        },
    
        // canvas圆角
        // drawRoundRect()
        drawRoundRect(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
            ctx.lineTo(width - radius + x, y);
            ctx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
            ctx.lineTo(width + x, height + y - radius);
            ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
            ctx.lineTo(radius + x, height + y);
            ctx.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
            ctx.closePath();
        },
    
    
        // 转换rpx单位为px
        changeRpx(rpx) {
            return rpx * that.data.canWidth / 750;
        },
    
        // 保存图片
        saveInviteCard(e) {
            app.saveCanvasToAlbum(e, that, res => {
                app.ulToast('保存成功', 1);
                that.setData({
                    showModal: false,
                    showWeekly: false,
                    postersShow: false
                });
            });
        },
    })
//