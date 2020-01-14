interface DogInterface {
  run(): void;
}

interface CatInterface {
  jump(): void;
}

let pet: DogInterface & CatInterface = {
  run() {},
  jump() {}
};

// 联合类型: 类型可能为多个类型中的一种,但不能确定是哪一种
let strA: number | string = "a";
let strB: "a" | "b" | "c";
let strC: 1 | 2 | 3;

// 定义两个类,分别实现两个接口
class Doga implements DogInterface {
  run() {}
  eat() {}
}

class Cata implements CatInterface {
  jump() {}
  eat() {}
}

// 定义枚举 Master
enum Master {
  Boy,
  Girl
}
// 根据类型获取实例
function getPet(master: Master) {
  let pet = master === Master.Boy ? new Doga() : new Cat();
  pet.eat();
  // pet.run()
  return pet;
}

// 正方形
interface Square {
  kind: "square";
  side: number; // 边长
}
// 长方形
interface Rectangle {
  kind: "rectangle";
  width: number; // 宽
  height: number; // 高
}
// 圆
interface Circle {
  kind: "circle";
  r: number; // 半径
}
type Shape = Square | Rectangle | Circle;
// 计算面积: 利用两种类型共有的kind属性,创建不同的类型保护区块
// function area(s: Shape): number {
function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.side * s.side;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.r ** 2;
    default:
      // 在default中检查未被之前case捕捉到的类型是否为never类型;
      // 如果s是never类型, 说明前面的所有分支都被覆盖了, 这个分支永远不会走到;
      // 如果s不是never类型, 说明前面的分支有遗漏, 需要补上这个分支;
      return ((e: never) => {
        throw new Error(e);
      })(s);
  }
}

console.log(area({ kind: "circle", r: 1 })); // 3.141592653589793

// 1. 简单的联合类型
// 2. 字面量联合类型
// 3. 对象联合类型
// 4. 可区分的联合类型
// 5. TS对联合类型的约束
