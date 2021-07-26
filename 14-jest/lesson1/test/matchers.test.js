// @ts-nocheck
// toBe 匹配器
// matcher object is ===
describe("toBe", () => {
  it("toBe Matcher用来执行 === 对比", () => {
    const a = 12;
    const b = a;

    expect(a).toBe(b);
    expect(a).not.toBe(null);
  });
});

// toEqual
// 判断两个对象是否相等，可以对比简单的值类型的变量和对象
describe("toEqual", () => {
  it("对比简单的值类型的变量", () => {
    const a = 12;
    expect(a).toEqual(12);
  });

  it("对比对象", () => {
    const foo = { a: 12, b: 34 };
    const bar = { a: 12, b: 34 };
    expect(foo).toEqual(bar);
  });
});

// toBeNull
describe("toBeNull", () => {
  it("toBeNull 用来判断是否为 null", () => {
    const a = null;
    const foo = "foo";

    expect(null).toBeNull();
    expect(a).toBeNull();
    expect(foo).not.toBeNull();
  });
});

// toBeUndefined
describe("toBeUndefined", () => {
  it("toBeUndefined 判断是否是 undefined", () => {
    const a = { foo: "foo" };

    expect(a.foo).not.toBeUndefined();
    expect(a.bar).toBeUndefined();
  });
});

// toBeDefined
// 判断是否非 undefined
describe("toBeDefined", () => {
  it("toBeDefined 判断是否非 undefined", () => {
    const a = { foo: "foo" };
    const b = null;

    expect(a.foo).toBeDefined();
    expect(a.bar).not.toBeDefined();
    expect(b).toBeDefined();
  });
});

// toBeTruthy/toBeFalsy
// 布尔测试，判断值是否是，或者可以转换为true
describe("toBeTruthy", () => {
  it("布尔测试，判断值是否，或者可以转换为 true/false", () => {
    const a = null;
    const foo = "foo";

    expect(foo).toBeTruthy();
    expect(a).toBeFalsy();
    // expect(a).not.toBeFalsy();
  });
});

// toBeLessThan/toBeGreaterThan
describe("toBeTruthy", () => {
  it("toBeLessThan 执行数字大小比较", () => {
    const pi = 3.1415926;
    const e = 2.78;

    // e 比 pi 小
    expect(e).toBeLessThan(pi);
    expect(pi).not.toBeLessThan(e);

    // pi 比 e 大
    expect(pi).toBeGreaterThan(e);
    expect(e).not.toBeGreaterThan(pi);
  });
});

// toBeGreaterThanOrEqual
describe("toBeGreaterThanOrEqual", () => {
  it("大于等于 >=", () => {
    const a = 5;
    expect(a).toBeGreaterThanOrEqual(5);
  });
});

// toBeLessThanOrEqual
describe("toBeLessThanOrEqual", () => {
  it("小于等于 <=", () => {
    const a = 5;
    expect(a).toBeLessThanOrEqual(5);
  });
});

// toBeCloseTo
// toBeCloseTo 是比较两个值是否足够接近（不一定要相等），“足够接近” 由第二个参数指定 Math.pow(10, -precision) / 2
// View Source: https://github.com/facebook/jest/blob/master/packages/expect/src/matchers.ts#L172
describe("toBeCloseTo", () => {
  it("是比较两个值是否足够接近（不一定要相等）", () => {
    const a = 0.1;
    const b = 0.2;
    // expect(a + b).toBe(0.3); // false
    // It fails because in JavaScript, 0.2 + 0.1 is actually 0.30000000000000004.
    expect(a + b).toBeCloseTo(0.3);

    const pi = 3.1415926;
    const e = 2.78;
    expect(pi).not.toBeCloseTo(e, 2);
    expect(pi).toBeCloseTo(e, 0);
  });
});

// toMatch
describe("toMatch", () => {
  it("toMatch 用来进行正则匹配", () => {
    const str = "https://github.com/WuChenDi";
    expect(str).toMatch(/WuChenDi/);
  });
});

// toContain
// 判断一个数组是否包含某个值
describe("toContain", () => {
  it("toContain 判断一个数组是否包含某个值", () => {
    const arr = ["https", "github", "com", "WuChenDi"];
    const data = new Set(arr);
    expect(data).toContain("WuChenDi");
  });
});

// toThrow
// 判断一个函数是否有抛出异常
describe("toContain", () => {
  it("toThrow 判断一个函数是否有抛出异常", () => {
    const throwNewErrorFunc = () => {
      throw new Error("this is a new error");
    };

    expect(throwNewErrorFunc).toThrow("this is a new error");
    expect(throwNewErrorFunc).toThrow(/this is a new error/);
    // expect(throwNewErrorFunc).not.toThrow('this is a new error');
    // expect(throwNewErrorFunc).not.toThrow(/this is a new error/);
  });
});
