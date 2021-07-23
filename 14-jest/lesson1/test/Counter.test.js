import Counter from "../code/Counter";

let counter = new Counter();

// beforeAll 所有测试用例之前
// beforeEach 每个测试用例执行前都调用
// afterEach 每个测试用例执行之后
// afterAll 所有测试用执行之后

beforeAll(() => {
  console.log("beforeAll");
  // counter = new Counter();
});

beforeEach(() => {
  console.log("beforeEach");
  counter = new Counter();
});

afterAll(() => {
  console.log("afterAll");
});

afterEach(() => {
  console.log("afterEach");
});

describe("测试增加相关的代码", () => {
  test("测试 Counter 中的 addOne 方法", () => {
    console.log("测试 Counter 中的 addOne 方法");
    counter.addOne();
    expect(counter.number).toBe(1);
  });
  test("测试 Counter 中的 addTwo 方法", () => {
    console.log("测试 Counter 中的 addTwo 方法");
    counter.addTwo();
    expect(counter.number).toBe(2);
  });
});

describe("测试减少相关的代码", () => {
  test("测试 Counter 中的 minusOne 方法", () => {
    console.log("测试 Counter 中的 minusOne 方法");
    counter.minusOne();
    expect(counter.number).toBe(-1);
  });

  test("测试 Counter 中的 minusTwo 方法", () => {
    console.log("测试 Counter 中的 minusTwo 方法");
    counter.minusTwo();
    expect(counter.number).toBe(-2);
  });
});
