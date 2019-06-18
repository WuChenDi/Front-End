var http = require('http')

function serverCallback(req, res) {
    var method = req.method.toLowerCase() // 获取请求的方法
    if (method === 'get') {
    }
    if (method === 'post') {
        // 接收 post 请求的内容
        var data = ''
        req.on('data', function (chunk) {
            // “一点一点”接收内容
            console.log('chunk', chunk.toString())
            data += chunk.toString()
        })
        req.on('end', function () {
            // 接收完毕，将内容输出
            console.log('end')
            res.writeHead(200, {'Content-type': 'text/html'})
            res.write(data)
            res.end()
        })
    }
    
}
http.createServer(serverCallback).listen(8081)  // 注意端口别和其他 server 的冲突
console.log('监听 8081 端口……')