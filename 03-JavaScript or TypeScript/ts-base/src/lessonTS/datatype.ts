// 原始类型
let bool: boolean = true;
let num: number | undefined | null = 123;
let str: string = "abc";
// str = 123

// 数组
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];
let arr3: Array<number | string> = [1, 2, 3, "4"];

// 元组
let tuple: [number, string] = [0, "1"];
// tuple.push(2);
// console.log(tuple); // [0, "1", 2]
// tuple[2];

// 函数
// let add = (x, y) => x + y;
// let add = (x: number, y: number) => x + y;
let add = (x: number, y: number): number => x + y;
let compute: (x: number, y: number) => number;
compute = (a, b) => a + b;

// 对象
// let obj: object = { x: 1, y: 2 };
// obj.x = 3;
let obj: { x: number; y: number } = { x: 1, y: 2 };
obj.x = 3;

// symbol
let s1: symbol = Symbol();
let s2 = Symbol();
// console.log(s1 === s2); // false

// undefined, null(默认情况下null和undefined是所有类型的子类型)
let un: undefined = undefined;
let nu: null = null;
num = undefined;
num = null;

// void
let noReturn = () => {};

// any
let x;
x = 1;
x = [];
x = () => {};

// never
let error = () => {
	throw new Error("error");
};
let endless = () => {
	while (true) {}
};
