// 方法装饰器
// function testDecorator() {
//   return function <T extends new (...args: any[]) => {}>(constructor: T) {
//     return class extends constructor {
//       name = "cc";
//       getName() {
//         return this.name;
//       }
//     };
//   };
// }

// const Test = testDecorator()(
//   class {
//     name: string;
//     constructor(name: string) {
//       this.name = name;
//     }
//   }
// );

// // @testDecorator
// // class Test {
// //   name: string;
// //   constructor(name: string) {
// //     console.log(1);
// //     this.name = name;
// //     console.log(2);
// //   }
// // }

// const test = new Test("dd");
// console.log(test.getName());
