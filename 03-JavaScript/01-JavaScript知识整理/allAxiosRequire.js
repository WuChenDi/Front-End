import qs from "qs";
import axios from "axios";
// import { getSession } from "../utils/utils";

let baseURL = "http://xxx.com";
window.baseURL = baseURL;

// 所有请求的全局配置
const instance = axios.create({
    baseURL,
    timeout: 6000,
    // withCredentials: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest"
    }
});

// 添加一个请求拦截器
instance.interceptors.request.use(
    config => {
        //在请求发送之前添加token
        if (sessionStorage._token) {
            if (config.method === "post") {
                if (config.data.append) {
                    config.data.append("token", sessionStorage._token);
                } else {
                    config.data.token = sessionStorage._token;
                }
                // console.log(config.data);
            } else if (config.method === "get") {
                config.url += "?token=" + sessionStorage._token;
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 添加一个返回拦截器
instance.interceptors.response.use(
    config => {
        //保存token到本地
        if (config.data.token) {
            sessionStorage._token = config.data.token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// function _getToken() {
//     return getSession("Token");
// }

// 获取token
// export function getToken() {
//     let url = "get-token";
//     return instance.get(url);
// }

/**
 * @method 登录
 * @param {*} loginname
 * @param {*} password
 */
export function login(loginname, password) {
    let url = "/liveajax/salelogin";
    return instance({
        method: "POST",
        url: url,
        data: qs.stringify({ loginname, password })
    });
}


export default instance;
