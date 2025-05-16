// 从 video 元素获取总时长和初始播放时间
const video = document.querySelector('video');
const totalDuration = video ? Math.floor(video.duration) : 2744; // 如果获取失败，默认 2744 秒
// 上报间隔（秒）
const interval = 1;
// watchLocation 递增步长
const watchLocationStep = 25;
// 当前 watchLocation，初始化为 video.currentTime
let watchLocation = video ? Math.floor(video.currentTime) : 0;

// 请求头（从 curl 请求中提取）
const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Action-Type': 'json',
    'Authorization': 'Basic xxx',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Origin': 'https://gdipx.yanxiu.com',
    'Pragma': 'no-cache',
    'Referer': 'https://gdipx.yanxiu.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    'X-DT-Passport': '',
    'X-DT-accessToken': 'xxx',
    'X-DT-clientId': 'ums-teacher-pc',
    'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'srxUserInfo': 'id:xxx|mobile:undefined|distinctId=xx'
};

// 基础 JSON 数据模板
const basePayload = {
    appId: '100002',
    bizType: 'yxb_course',
    dataType: 'pull2',
    resSource: 'courseware',
    resType: 'rec',
    bizUserId: 'xxx',
    bizId: '598833234801713166',
    forceAccept: 0,
    pageId: (new Date).valueOf(),
    resId: '156147',
    watchTime: 25, // 固定为 25，与原始请求一致
    customData: '6289627417674086227'
};

// 模拟上报函数
function sendHeartbeat() {
    // 更新 watchLocation
    watchLocation += watchLocationStep;
    if (watchLocation > totalDuration) {
        watchLocation = totalDuration; // 确保不超过总时长
    }

    // 构造请求数据
    const payload = {
        ...basePayload,
        watchLocation: watchLocation
    };

    // 发送 POST 请求
    fetch('https://gdipx-api.yanxiu.com/heartbeat-center/hb/report', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
        mode: 'cors',
        credentials: 'omit'
    })
    .then(response => response.json())
    .then(data => {
        console.log(`上报 watchLocation: ${watchLocation}, watchTime: ${payload.watchTime}, 响应:`, data);
    })
    .catch(error => {
        console.error(`上报 watchLocation: ${watchLocation}, watchTime: ${payload.watchTime} 失败:`, error);
    });

    // 如果未达到总时长，继续下一次上报
    if (watchLocation < totalDuration) {
        setTimeout(sendHeartbeat, interval * 1000); // 每 1 秒触发一次
    } else {
        console.log('视频播放完成，上报结束');
    }
}

// 检查视频元素是否存在
if (!video) {
    console.warn('未找到 video 元素，使用默认时长 2744 秒，watchLocation 从 0 开始');
} else if (isNaN(video.duration) || isNaN(video.currentTime)) {
    console.warn('视频元数据未加载或时长/当前时间不可用，使用默认时长 2744 秒，watchLocation 从 0 开始');
    video.addEventListener('loadedmetadata', () => {
        console.log(`视频元数据加载完成，时长: ${Math.floor(video.duration)} 秒，当前时间: ${Math.floor(video.currentTime)} 秒`);
    });
}

// 输出总时长和初始 watchLocation 并开始上报
console.log(`开始模拟心跳上报（每1秒），视频总时长: ${totalDuration} 秒，初始 watchLocation: ${watchLocation}`);
sendHeartbeat();
