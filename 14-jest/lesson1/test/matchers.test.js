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
// 判断是否为 null
describe("toBeNull", () => {
  it("toBeNull 用来判断是否为 null", function () {
    const a = null;
    const foo = "foo";

    expect(null).toBeNull();
    expect(a).toBeNull();
    expect(foo).not.toBeNull();
  });
});

// toBeUndefined
// 判断是否是undefined
describe("toBeUndefined", () => {
  it("toBeUndefined 判断是否是 undefined", function () {
    const a = { foo: "foo" };

    expect(a.foo).not.toBeUndefined();
    expect(a.bar).toBeUndefined();
  });
});

// toBeDefined
// 判断是否非 undefined
describe("toBeDefined", () => {
  it("toBeDefined判断是否非undefined", function () {
    const a = { foo: "foo" };
    const b = null;

    expect(a.foo).toBeDefined();
    expect(a.bar).not.toBeDefined();
    expect(b).toBeDefined();
  });
});
