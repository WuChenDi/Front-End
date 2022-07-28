// // 访问器的装饰器
// function visitDecorator(
//   target: any,
//   key: string,
//   descriptor: PropertyDescriptor
// ) {
//   // descriptor.writable = false;
// }

// class Test {
//   private _name: string;
//   constructor(name: string) {
//     this._name = name;
//   }
//   get name() {
//     return this._name;
//   }
//   @visitDecorator
//   set name(name: string) {
//     this._name = name;
//   }
// }

// const test = new Test("dell");
// test.name = "dd";
// console.log(test.name);
