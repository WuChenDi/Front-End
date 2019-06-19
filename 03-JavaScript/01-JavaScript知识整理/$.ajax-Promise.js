/**
 * @typedef {Object} Options
 * @property {String} type 请求方法
 * @property {String} url 路径
 * @property {Boolean} async 是否异步 - true:异步，false:同步
 * @property {Object} data 发送数据
 **/

function getAjax(type, url, async, data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: type,
            url: url,
            async: async,
            data: data,
            sussess: function (data) {
                resolve(data)
            },
            error: function (error) {
                reject(error)
            }
        })
    })
}


// 调用
var taskOne = getAjax('GET', 'http://localhost:8080/Test', true, { id: 5, sex: 'male' });
var taskTwo = getAjax('POST', 'http://localhost:8080/Test', true, { id: 5, sex: 'male' });

taskOne.then(function (data) {
    console.log(data)
}, function (error) {
    console.log(error.status)
})