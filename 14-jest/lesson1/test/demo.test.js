import axios from "axios";
import { runCallback, createObject, getData } from "../code/demo";

// mock
// 1. 捕获函数的调用和返回结果，以及this和调用顺序
// 2. 可以让我们自由的设置返回结果
// 3. 改变函数的内部实现

test("测试 runCallback", () => {
  // 通过 jest.fn 创建的 mock 函数，可以用 toBeCalled 捕获这个函数是否被调用了
  const func = jest.fn();
  runCallback(func);
  expect(func).toBeCalled();
  // 每一次调用传入的都是 test
  expect(func).toBeCalledWith("test");
  console.log(func.mock);
  {
    // calls: [ [ 'test' ], [ 'test' ], [ 'test' ] ], // 包含调用时，传递的参数，可以通过判断calls的length来判断调用了几次
    // instances: [ undefined, undefined, undefined ], // 指func 运行时，this的指向
    // invocationCallOrder: [ 2, 3, 4 ], // 调用的顺序
    // // 执行调用的返回值
    // results: [
    //   { type: 'return', value: undefined },
    //   { type: 'return', value: undefined },
    //   { type: 'return', value: undefined }
    // ]
  }
});

test("测试 runCallback 函数多次调用", () => {
  const func = jest.fn();
  runCallback(func);
  runCallback(func);
  runCallback(func);
  expect(func.mock.calls.length).toBe(3);
  console.log(func.mock);
});

test("测试 runCallback 调用传递参数", () => {
  const func = jest.fn();
  runCallback(func);
  expect(func.mock.calls[0]).toEqual(["test"]);
});

test("测试 runCallback 函数定义返回值 mockReturnValue", () => {
  const func = jest.fn();
  // 定义返回值
  func.mockReturnValue("dd");
  runCallback(func);
  runCallback(func);
  runCallback(func);
  expect(func.mock.calls.length).toBe(3);
  expect(func.mock.results[0].value).toBe("dd");
  console.log(func.mock);
});

test("测试 runCallback 函数定义返回值 mockImplementation", () => {
  const func = jest.fn();

  func.mockImplementation(() => {
    console.log("mockImplementation");
    return "dd";
  });

  runCallback(func);
  runCallback(func);
  runCallback(func);
  expect(func.mock.calls.length).toBe(3);
  expect(func.mock.results[0].value).toBe("dd");
  console.log(func.mock);
});

test("测试 runCallback 函数定义返回值 mockImplementationOnce", () => {
  const func = jest.fn();
  // func.mockReturnValueOnce('dd')
  func.mockImplementationOnce(() => {
    return "dd";
  });
  func.mockImplementationOnce(() => {
    return "ww";
  });

  // 返回 this 两种写法
  // func.mockImplementationOnce(() => {
  //   return this;
  // });
  func.mockReturnThis();

  runCallback(func);
  runCallback(func);
  runCallback(func);
  expect(func.mock.calls.length).toBe(3); // 断言
  expect(func.mock.results[0].value).toBe("dd");
  expect(func.mock.results[1].value).toBe("ww");
  expect(func.mock.results[2].value).toBeUndefined();
  console.log(func.mock);
});

test("测试 createObject instances", () => {
  const func = jest.fn();
  createObject(func);
  console.log(func.mock);
});

jest.mock("axios");
test("测试 getData", async () => {
  // 模拟返回，不会去请求真实的数据
  // mockResolvedValueOnce
  const parameter = { data: "hello" };
  axios.get.mockResolvedValue(parameter);
  await getData().then((data) => {
    expect(data).toBe(parameter.data);
  });
});

test("测试 getData 多个 request", async () => {
  const parameter = { data: "hello" };
  const params = { data: "world" };

  axios.get.mockResolvedValueOnce(parameter);
  axios.get.mockResolvedValueOnce(params);
  await getData().then((data) => {
    expect(data).toBe(parameter.data);
  });
  await getData().then((data) => {
    expect(data).toBe(params.data);
  });
});
