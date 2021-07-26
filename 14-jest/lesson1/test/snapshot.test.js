// @ts-nocheck

import {
  generateConfig,
  generateAnotherConfig,
  generateTimeConfig,
} from "../code/snapshot";

test("测试 generateConfig 函数", () => {
  // expect(generateConfig()).toEqul({
  //   server: "http://localhost",
  //   port: 8080,
  // });
  expect(generateConfig()).toMatchSnapshot();
});

// 假设，测试一个配置文件，如果你修改了配置文件，如果使用的是toEqual()

// 那么每次修改配置，都需要同步修改test，这样很麻烦，使用 toMatchSnapshot(快照)， 会在根目录生成一个snapshots文件保存运行时，的测试的配置项代码，就好像，拍了一个照片，之后就会和对比新快照，和旧快照是否一致，判断测试用例是否通过，

// 假设这时修改了配置
// 1 snapshot failed from 1 test suite. Inspect your code changes or press `u` to update them.
// 你只需打开w操作指令，按u表示，更新快照，就可以再次通过，类似于提示你，是否要确实这次修改

// 当出现多个快照时，如果不想所有快照都更新，想一个一个确认更新，这个时候 w 中会多出一个 i 模式，让你进入到一个一个确认下，这时再按 u 就表示确认更新快照。如果感觉是错的，或者不确定，可以按s跳过该快照用例

test("测试generateAnotherConfig 函数", () => {
  expect(generateAnotherConfig()).toMatchSnapshot();
});

// 当配置项中存在 new Date() 或 其他动态变化的数据，需要配置忽略它，不然无法通过
test("测试generateTimeConfig 函数", () => {
  expect(generateTimeConfig()).toMatchSnapshot({
    time: expect.any(Date),
  });
});

// 生成行内快照，下面的object就是运行后生成的快照
// 安装 yarn add prettier
// 行内快照 oMatchInlineSnapshot 不会单独生成一个文件，而是把快照直接生成到函数内，
test("测试generateAnotherConfig 函数", () => {
  expect(generateTimeConfig()).toMatchInlineSnapshot(
    {
      time: expect.any(Date),
    },
    `
    Object {
      "port": 8080,
      "proxy": 8084,
      "sever": "localhost",
      "time": Any<Date>,
    }
  `
  );
});
