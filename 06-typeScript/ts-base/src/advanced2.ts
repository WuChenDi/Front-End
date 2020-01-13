enum Type {
  Strong,
  Week
}

class Java {
  helloJava() {
    console.log("Hello Java");
  }
  java: any; // 新增java属性
}

class JavaScript {
  helloJavaScript() {
    console.log("Hello JavaScript");
  }
  javascript: any; // 新增javascript属性
}

// 创建类型保护函数,返回值为类型谓词 格式: 参数 + is + 类型
function isJava(lang: Java | JavaScript): lang is Java {
  // 使用类型断言,通过判断是否存在特定方法,确定对象是否为某类型
  return (lang as Java).helloJava !== undefined;
}

function getLanguage(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript();

  // TS不能准确判断实例到底是哪一种类型
  // if (lang.helloJava) {
  //   lang.helloJava();
  // } else {
  //   lang.helloJavaScript();
  // }

  // 使用类型断言
  // if ((lang as Java).helloJava) {
  //   (lang as Java).helloJava();
  // } else {
  //   (lang as JavaScript).helloJavaScript();
  // }

  // TS的类型保护机制
  // 使用instance关键字创建区块
  // if (lang instanceof Java) {
  //   lang.helloJava();
  // } else {
  //   lang.helloJavaScript();
  // }

  // 通过in关键字判断变量所属类型来创建区块
  // if ("java" in lang) {
  //   lang.helloJava();
  // } else {
  //   lang.helloJavaScript();
  // }

  // 通过typeof对参数x的类型进行判断,创建对应的区块
  // if (typeof x === "string") {
  //   x.length; // string
  // } else {
  //   x.toFixed(2); // number
  // }

  // 通过类型保护函数创建区块
  if (isJava(lang)) {
    lang.helloJava;
  } else {
    lang.helloJavaScript;
  }

  return lang;
}

getLanguage(Type.Strong, "");

// TS的类型检查机制:类型推断,类型兼容性,类型保护
// 利用这些机制,配置IDE的自动补全,提示功能,极大提高开发效率
