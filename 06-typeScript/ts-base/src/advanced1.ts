/**
 * X 兼容 Y: X (目标类型) = Y (源类型)
 */

let s: string = "a";
// s = null

// 接口兼容性
interface x {
	a: any;
	b: any;
}

interface Y {
	a: any;
	b: any;
	c: any;
}

// let x: X = { a: 1, b: 2 };
// let y: Y = { a: a, b: 2, c: 3 };
// x = y;
// y = x;

// 函数兼容性
type Handler = (a: number, b: number) => void;
function hof(hadler: Handler) {
	return hadler;
}

// 1) 参数个数
let hadler1 = (a: number) => {};
hof(hadler1);

let hadler2 = (a: number, b: number, c: number) => {};
// hof(hadler2);

{
	// 可选参数和剩余参数
	let a = (p1: number, p2: number) => {};
	let b = (p1?: number, p2?: number) => {};
	let c = (...args: number[]) => {};

	// tsconfig.json -> "strictFunctionTypes": false,
	a = b; // 固定参数可以兼容可选参数
	a = c; // 固定参数可以兼容剩余参数

	// tsconfig.json ("strictFunctionTypes": false可兼容)
	// b = c; // 可选参数不兼容固定参数
	// b = a; // 可选参数不兼容剩余参数
	c = a; // 剩余参数不兼容固定参数
	c = b; // 可选参数不兼容剩余参数
}

// 2) 参数类型
let hadler3 = (a: number) => {};
hof(hadler3);

// let hadler3 = (a: string) => { }
// hof(hadler3)

interface Point3D {
	x: number;
	y: number;
	z: number;
}
interface Point2D {
	x: number;
	y: number;
}

let p2d = (ponit: Point2D) => {};
let p3d = (ponit: Point3D) => {};

// tsconfig.json ("strictFunctionTypes": false可兼容)
// p2d = p3d // Point2D 不兼容 Point3D
p3d = p2d; // Point3D 兼容 Point2D

// 3) 返回值类型
let f1 = () => ({ name: "Alice" });
let g = () => ({ name: "Alice", location: "Beijing" });
// 成员少的兼容成员多的
f1 = g;
// g = f1;

// 函数重载对函数兼容性的影响
// 函数定义-重载列表
function overload(a: number, b: number): number;
function overload(a: number, b: number): string;
// 函数实现
// 兼容: 目标函数参数个数 > 源函数参数个数
function overload(a: any, b: any): any {}

// 不兼容: 目标函数参数个数 < 源函数参数个数
// function overload(a: any, b: any, c: any): any {}

// 不兼容: 删除返回值
// function overload(a: any, b: any) {}

// 枚举兼容性
enum Fruit {
	Apple,
	Banana,
}

enum Color {
	Red,
	Yellow,
}

let fruit: Fruit.Apple = 1;
let no: number = Fruit.Apple;
// 不同枚举之间不兼容
// let color: Color.Red = Fruit.Apple;

// 类的兼容性
// 静态成员和构造函数不参与类的兼容性比较
class A {
	constructor(p: number, q: number) {} // 构造函数
	id: number = 1;
	private name: string = ""; // 私有成员
}

class B {
	static s: number = 1; // 静态成员
	constructor(p: number) {} // 构造函数
	id: number = 2;
	private name: string = ""; // 私有成员
}

let aa = new A(1, 2);
let bb = new B(1);
// 类中包含私有成员，两个类不兼容
// aa = bb;
// bb = aa;

// 但父类和子类之间兼容
class C1 extends A {} // 创建子类
let cc = new C1(1, 2);
aa = cc; // 父类兼容子类
cc = aa; // 子类兼容父类

// 泛型的兼容性
// 当类型参数T未被成员使用是，不会影响泛型兼容性
interface Empty<T> {}
let obj1: Empty<number> = {};
let obj2: Empty<string> = {};
obj1 = obj2;

// 当类型参数T被成员使用时，才会影响泛型兼容性
interface Empty1<T> {
	attr: T;
}
let obj3: Empty1<number> = { attr: 1 };
let obj4: Empty1<string> = { attr: "1" };
// obj3 = obj4;

// 泛型函数的兼容性
// 定义相同的两个泛型函数,如果未指定具体类型,则可相互兼容
let t1 = <T>(x: T): T => {
	console.log("x");
	return x;
};

let t2 = <U>(y: U): U => {
	console.log("y");
	return y;
};

t1 = t2; // 未指定类型的两个定义相同的泛型函数，可相互兼容

// TS允许类型兼容的变量之间相互进行赋值操作,这个特性增加了语言的灵活性

// 结构之间兼容:成员少的兼容成员多的
// 函数之间兼容:参数多的兼容参数少的
