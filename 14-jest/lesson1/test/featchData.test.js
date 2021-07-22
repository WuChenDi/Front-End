import { fetchDataCbk, fetchData, fetchDataCatch } from "../code/featchData";

describe("回调类型的异步函数测试, 只有执行到done执行才结束", () => {
  it("用done来测试返回结果为 { success: true }", (done) => {
    fetchDataCbk((data) => {
      expect(data).toEqual({
        success: true,
      });
      done();
    });
  });
});

describe("无回调类型的异步函数测试", () => {
  it("测试返回结果为 { success: true }", () => {
    return fetchData().then((res) => {
      console.log(res);
      expect(res.data).toEqual({
        success: true,
      });
    });
  });

  it("测试返回结果为 { success: true }", () => {
    return expect(fetchData()).resolves.toMatchObject({
      data: {
        success: true,
      },
    });
  });
});

describe("测试返回404", () => {
  it("one", () => {
    // 测试用例必须执行一次
    expect.assertions(1);

    return fetchDataCatch().catch((e) => {
      expect(e.toString().indexOf("404") !== -1).toBe(true);
    });
  });

  it("two", () => {
    return expect(fetchDataCatch()).rejects.toThrow();
  });
});

test("测试返回结果为 404", async () => {
  await expect(fetchData()).rejects.toThrow();
});
