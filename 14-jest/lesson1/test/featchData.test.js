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
      // console.log(res);
      expect(res.data).toEqual({
        success: true,
      });
    });
  });

  it("测试返回结果为 { success: true }", async () => {
    const res = await fetchData();
    expect(res.data).toEqual({
      success: true,
    });
  });

  it("测试返回结果为 { success: true }", async () => {
    await expect(fetchData()).resolves.toMatchObject({
      data: {
        success: true,
      },
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

  it("three", async () => {
    // 测试用例必须执行一次
    expect.assertions(1);
    try {
      await fetchDataCatch();
    } catch (error) {
      expect(error.toString()).toEqual("Error: Request failed with status code 404");
      // console.log(error.toString());
    }
  });
});
