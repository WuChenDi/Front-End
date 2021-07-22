import axios from "axios";

// 该接口返回值
// {
// "success": true
// }

// 回调类型的异步函数
export const fetchDataCbk = (fn) => {
  axios
    .get("http://www.dell-lee.com/react/api/demo.json")
    .then(function (response) {
      fn(response.data);
    });
};

// 无回调类型的异步函数
export const fetchData = () => {
  return axios.get("http://www.dell-lee.com/react/api/demo.json");
};

// 无回调类型的异步函数-错误
export const fetchDataCatch = () => {
  return axios.get("http://www.dell-lee.com/react/api/demo1.json");
};
