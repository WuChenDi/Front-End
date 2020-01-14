let adObj = {
  a: 1,
  b: 2,
  c: 3
};
// // 获取对象中的指定属性的值集合
// function getValues(adObj: any, keys: string[]) {
//   return keys.map(key => adObj[key]);
// }
// console.log(getValues(adObj, ["a", "b"])); // [1, 2]
// console.log(getValues(adObj, ["e", "f"])); // [undefined, undefined]
// 虽然obj中并不包含e, f属性,但TS编译器并未报错
// 此时使用TS索引类型,对这种模式做类型约束

// TS索引类型
// 1.索引类型的查询操作符
// keyof T (表示类型T的所有公共属性的字面量的联合类型)

// 定义一个接口Obj含有属性a,b
interface obj {
  a: number;
  b: string;
}
// 定义变量key,类型为keyof Obj
let key: keyof obj;

// 2.索引访问操作符
// T[K] (表示对象T的属性K所代表的类型)
let value: obj["a"];

// 3.泛型约束
// T extends U (表示泛型变量可以通过继承某个类型,获得某些属性)

// 索引类型
// 约束目的: 从obj对象中抽取的属性数组keys中的元素,一定得是obj对象中的属性

// 思路:
// 1. 定义泛型变量T, K,分别约束obj对象和keys数组
// 2. 为K增加一个泛型约束,使K继承Obj的所有属性的联合类型, 即`K extends keyof T`
// 3. 此时,函数返回值类型-数组的元素类型,就是属性K对应的数组,即`T[K][]`

function getValues<T, K extends keyof T>(adObj: T, keys: K[]): T[K][] {
  return keys.map(key => adObj[key]);
}

console.log(getValues(adObj, ["a", "b"])); // [1, 2]
// console.log(getValues(adObj, ["e", "f"]));
// 通过索引类型将getValue函数改造后,TS的类型检查就可以发挥作用了
// 当指定了一个不在obj中的属性时,编译器就会报错

// 索引类型可以约束对象属性的查询和访问
// 配合泛型约束能够建立对象,对象属性,属性值之间的约束关系


