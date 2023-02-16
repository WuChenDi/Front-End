# 🚀 dd-cli-test

- Used to demonstrate the scaffolding development and release process.
- [dd-cli-test-lib](https://www.npmjs.com/package/dd-cli-test-lib)

[![NPM](https://nodei.co/npm-dl/dd-cli-test.png?months=3&height=2)](https://nodei.co/npm/dd-cli-test/)

[![npm version](https://img.shields.io/npm/v/dd-cli-test.svg)](https://www.npmjs.com/package/dd-cli-test)
[![npm downloads](https://img.shields.io/npm/dm/dd-cli-test.svg)](https://www.npmjs.com/package/dd-cli-test)
[![GitHub license](https://img.shields.io/github/license/WuChenDi/Front-End)](https://github.com/WuChenDi/Front-End/blob/master/LICENSE)

## ✨ Details

- use

```bash
npm install -g dd-cli-test

# run dd-cli-test
# welcome dd cli test

npm remove -g dd-cli-test
```

### 🔨 Scaffold locallink standard process

- Link local scaffolding

```bash
cd ./17-cli/01-test/
npm link
```

- Linking local library files

```bash
cd ./17-cli/02-test-lib/
npm link
cd ./17-cli/01-test/
npm link dd-cli-test-lib
```

- Unlink local library files

```bash
cd ./17-cli/02-test-lib/
npm unlink
cd ./17-cli/01-test/
# link exists
npm unlink dd-cli-test-lib
# link doesn't exist
rm -rf node_modules
npm install -S dd-cli-test-lib
```

<!-- 理解 `npm link`：

1. `npm link your-lib`：将当前项目中 `node_modules` 下指定的库文件链接到 `node` 全局 `node_modules` 下的库文件
2. `npm link`：将当前项目链接到 `node` 全局 `node_modules` 中作为一个库文件，并解析 `bin` 配置创建可执行文件

理解 `npm unlink`：

1. `npm unlink`：将当前项目从 `node` 全局 `node_modules` 中移除
2. `npm unlink your-lib`：将当前项目中的库文件依赖移除 -->

## Publish

- npm

```bash
npm login
npm publish
npm unpublish dd-cli-test@1.0.0
npm unpublish dd-cli-test -f
```

## 📚 Preview

![01-cli](https://raw.githubusercontent.com/WuChenDi/Front-End/master/screenshots/17-01-cli.png)
