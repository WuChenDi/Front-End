// 泛型的好处
// 1. 函数和类可以轻松地支持多种类型，增强程序的控制性
// 2.不必写多余函数重载，冗长的联合类型声明，增强代码可读性
// 3.灵活控制类型之间的约束

class DLog<T> {
	run(value: T) {
		console.log(value);
		return value;
	}
}
let log1 = new DLog<number>();
log1.run(1);
// log1.run('1')
let log2 = new DLog();
log2.run({ a: 1 });
log2.run("1");

interface Length {
	length: number;
}
function Dlog<T extends Length>(value: T): T {
	console.log(value, value.length);
	return value;
}
Dlog([1]);
Dlog("123");
Dlog({ length: 1 });
