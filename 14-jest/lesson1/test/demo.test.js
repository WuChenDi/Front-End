import { runCallback, createObject } from "../code/demo";

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

test("测试 runCallback", () => {
  // 通过 jest.fn 创建的 mock 函数，可以用 toBeCalled 捕获这个函数是否被调用了
  const func = jest.fn();
  runCallback(func);
  expect(func).toBeCalled();
  console.log(func.mock);
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

test("测试 runCallback 函数定义返回值", () => {
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

test("测试 createObject", () => {
  const func = jest.fn();
  createObject(func);
  console.log(func.mock);
});
