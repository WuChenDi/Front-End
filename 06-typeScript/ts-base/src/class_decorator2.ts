// // 普通方法，taget 对应的是类的 prototype, key 对应的是方法的名称
// function getNameDecorator(
//   target: any,
//   key: string,
//   descriptor: PropertyDescriptor
// ) {
//   // 不允许修改原始方法
//   descriptor.writable = false;
//   console.log(target, key);
// }

// // 静态方法，target 对应的是类的构造函数
// function helloDecorator(target: any, key: string) {
//   console.log(target, key);
// }

// class Test {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
//   @getNameDecorator
//   getName() {
//     return this.name;
//   }

//   @helloDecorator
//   static hello() {
//     return console.log(123);
//   }
// }

// const test = new Test("dd");
// test.getName = () => {
//   return "123";
// };
// console.log(test.getName());
