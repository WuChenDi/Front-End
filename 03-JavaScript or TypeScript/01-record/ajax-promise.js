const ajax = (options) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        let url = options.baseURL + options.url
        let method = options.method.toUpperCase() || 'GET'

        if (method === 'GET') {
            if (options.data.constructor === Object && Object.keys(options.data).length) {
                let arr = []
                for (let [key, value] of Object.entries(options.data)) {
                    arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                }
                arr = arr.join('&')
                url = `${url}?${arr}`
            } else {
                throw new TypeError('GET的参数格式错误，请输入含有值的对象')
            }
        }

        options.responseType ? xhr.responseType = options.responseType : ''
        options.timeout ? xhr.timeout = options.timeout : ''
        options.withCredentials ? xhr.withCredentials = options.withCredentials : ''

        xhr.open(method, url, true)

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                resolve(xhr.response)
            } else {
                reject({
                    xhr,
                    msg: 'load'
                })
            }
        }
        xhr.upload.onprogress = (e) => {
            console.log('上传')
            options.updateProgress ? options.updateProgress(e) : ''
        }
        xhr.onprogress = (e) => {
            console.log('下载')
            options.updateProgress ? options.updateProgress(e) : ''
        }
        xhr.onabort = () => {
            reject({
                xhr,
                msg: `abort`
            })
        }
        xhr.onerror = function () {
            reject({
                xhr,
                msg: 'error'
            })
        }
        xhr.ontimeout = function () {
            reject({
                xhr,
                msg: `timeout:${options.timeout}`
            })
        }

        //header的设置必须要在open调用open()方法后
        if (options.headers) {
            for (let [key, value] of Object.entries(options.headers)) {
                xhr.setRequestHeader(key, value)
            }
        }

        //try/catch防止请求时候断网抛错阻塞脚本
        try {
            xhr.send(options.data)
        } catch (e) {
            reject({
                xhr,
                msg: e
            })
        }
    })
}

/**
 * @typedef {Object} Options
 * @property {String} baseURL 根路径
 * @property {String} url 路径
 * @property {String} method 请求方法
 * @property {Number} timeout 超时时间
 * @property {String} responseType 响应数据类型
 * @property {Object} data 发送数据
 * @property {Boolean} withCredentials 是否携带跨域cookie，需要后端支持跨域cookie和请求
 * @property {Object} headers 请求头，需要后端支持自定义请求头
 * @property {Function} updateProgress 上传/下载触发的事件
 **/

let data = { a: 1 }

let options = {
    baseURL: 'http://localhost:3000',
    url: '/',
    method: 'get',
    timeout: 10000,
    responseType: 'json',
    data: data,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
    },
    updateProgress(e) {
        console.log(e)
    },
}

/**
 * @method ajax
 * @param {Options}options ajax的配置
 * @return {Promise} 返回一个promise实例
 **/


ajax(options).then(res => {
    console.log('res', res)
}).catch(err => {
    console.log('err', err)
})