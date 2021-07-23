import Counter from "../code/Counter";

// 每一个 describe 都是一个单独的作用域，可以作用于，下面的所有的 describe
// 同级的互不影响，每个 describe 都可以拥有独自的钩子函数，执行顺序，先执行外部，再执行内部
describe("测试增加相关的代码", () => {
  let counter = null;

  // beforeAll 所有测试用例之前
  // beforeEach 每个测试用例执行前都调用
  // afterEach 每个测试用例执行之后
  // afterAll 所有测试用执行之后

  beforeAll(() => {
    console.log("外层 beforeAll");
    // counter = new Counter();
  });

  beforeEach(() => {
    console.log("外层 beforeEach");
    counter = new Counter();
  });

  afterAll(() => {
    console.log("外层 afterAll");
  });

  afterEach(() => {
    console.log("外层 afterEach");
  });

  describe("测试增加相关的代码", () => {
    beforeAll(() => {
      console.log("内层 beforeAll");
    });

    beforeEach(() => {
      console.log("内层 beforeEach");
    });

    afterAll(() => {
      console.log("内层 afterAll");
    });

    afterEach(() => {
      console.log("内层 afterEach");
    });

    // 如果只想执行某一个用例，可以用 test.only 来修饰 only可以同时存在多个
    // test.only("测试 Counter 中的 addOne 方法", () => {
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
});
