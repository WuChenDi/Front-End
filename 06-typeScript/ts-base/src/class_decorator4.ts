// // 属性的装饰器
// // function nameDecorator(target: any, key: string): any {
// //   const descriptor: PropertyDescriptor = {
// //     writable: false,
// //   };
// //   return descriptor;
// // }

// // test.name = "Di-got";

// // 修改的并不是实例上的 name， 而是原型上的 name
// function nameDecorator(target: any, key: string): any {
//   target[key] = "ww";
// }

// // name 放在实例上
// class Test {
//   @nameDecorator
//   name = "dd";
// }

// const test = new Test();
// console.log((test as any).__proto__.name);
