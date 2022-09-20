# Node 脚手架

运用 Node 基础知识，打造一个自己的脚手架工具。

- 输入github name, 下载仓库代码

## 快速开始

### 1. 安装依懒

```bash
npm install

# 挂载
npm link
```

### 2. 运行程序

```bash
wudi@wudi MINGW64 /d/WuChenDi/GitHub/Front-End/07-nodejs/cli (master)
$ cli -h
Usage: cli [options] [command]

Options:
  -f --framework <framework>       Setting the frame
  -h, --help                       display help for command

Commands:
  create|crt <project> [other...]  Create project
  help [command]                   display help for command
```

#### 2.1 create

```bash
wudi@wudi MINGW64 /d/WuChenDi/GitHub/Front-End/07-nodejs/cli (master)
$ cli create github
? Please enter the github user nickname WuChenDi
? Please select the frame you are using es6
{ framework: 'es6' }
✔ Code download successfully
Done! you run:
cd github/es6
npm install 
npm run dev 
```

## 3. 其他

test目录属于demo用例
