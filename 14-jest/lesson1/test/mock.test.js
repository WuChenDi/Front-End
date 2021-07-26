// @ts-nocheck
jest.mock("../code/mock.js");

import { fetchData } from "../code/mock";

test("fetchData 测试", () => {
  return fetchData.then((data) => {
    expect(eval(data)).toEqual("123");
  });
});
