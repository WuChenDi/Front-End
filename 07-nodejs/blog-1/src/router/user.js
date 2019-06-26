const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is ', d.toGMTString())
    return d.toGMTString()
}

const handleUserRouter = (req, res) => {
    const method = req.method // GET POST

    // 登录
    // if (method === "POST" && req.path === "/api/user/login") {
    //     const { username, password } = req.body
    //     const result = login(username, password)
    //     return result.then(data => {
    //         if (data.username) {
    //             return new SuccessModel()
    //         }
    //         return new ErrorModel('登录失败')
    //     })
    // }
    if (method === "GET" && req.path === "/api/user/login") {
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                console.log(data)
                // 操作cookie
                res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }

    // 登录验证
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(
                new SuccessModel({
                    username: req.cookie.username
                })
            )
        }
        return Promise.resolve(new ErrorModel('未登录'))
    }
}

module.exports = handleUserRouter;
