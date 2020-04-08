// 映射类型

// 定义接口 Obj
interface Obj {
	a: string;
	b: number;
	c: boolean;
}

// 使用类型别名定义类型ReadonlyObj
type ReadonlyObj = Readonly<Obj>; // Readonly是TS内置的泛型接口
// ReadonlyObj与Obj成员完全相同,区别是ReadonlyObj中的成员属性均为只读

// Readonly的实现原理:
// Readonly是一个可索引类型的泛型接口
// 1)索引签名为P in keyof T :
// 其中keyof T就是一个一个索引类型的查询操作符,表示类型T所有属性的联合类型

// 2)P in :
// 相当于执行了一个for in操作,会把变量P依次绑定到T的所有属性上

// 3)索引签名的返回值就是一个索引访问操作符 : T[P]  这里代表属性P所指定的类型

// 4)最后再加上Readonly就把所有的属性变成了只读,这就是Readonly的实现原理

type PartialObj = Partial<Obj>; // 可选
// 可选和只读映射类型的实现几乎一样, 只读属性变为可选

type PickObj = Pick<Obj, "a" | "b">; // 抽取接口Obj中的属性a和b,形成新类型
// Pick映射类型有两个参数:
// 第一个参数T,表示要抽取的目标对象
// 第二个参数K,具有一个约束:K一定要来自T所有属性字面量的联合类型,
// 即映射得到的新类型的属性一定要从K中选取

// 以上三种映射类型官方称为同态，意思是只作用于obj属性而不会引入新的属性

// 引入新属性的非同态映射类型
type RecordObj = Record<"x" | "y", Obj>;
// 第一个参数是预定义的新属性，如x,y
// 第二个参数就是已知类型

// 映射出的新类型所具有的属性由Record的第一个属性指定，而这些属性类型为第二个参数指定的已知类型，这种类型就是一个非同态的类型

// 映射类型本质上是一种预先定义的泛型接口，通常还会结合索引类型，获取对象的属性和属性值，从而将一个对象映射为我们想要的结构
