// 条件类型

// T extends U ? X : Y

type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends Function ? "Function" : "object";

// 定义类型T1为条件类型,传入参数string,指定t1为string类型
type T1 = TypeName<string>;
// 定义类型T2为条件类型,传入参数string[]
type T2 = TypeName<string[]>;

// T为类型A和类型B的联合类型,结果类型会变成多个条件类型的联合类型
// (A | B) extends U ? X : Y

// 可以将A和B进行拆解:
// (A extends U ? X : Y) | (B extends U ? X : Y)

type T3 = TypeName<string | string[]>;

// 如果T可以被赋值给U,结果类型为never类型,否则为T类型
type Diff<T, U> = T extends U ? never : T;

type T4 = Diff<"a" | "b" | "c", "a" | "e">;

// 拆解分析:
// Diff<"a", "a" | "e"> | Diff<"b", "a" | "e"> | Diff<"c", "a" | "e">
// never | "b" | "c"
// "b" | "c"

// Diff扩展:从T中过滤掉undefined和null
type NotNull<T> = Diff<T, undefined | null>;

// 过滤掉undefined和null,T5的类型就变成了string和number
type T5 = NotNull<string | number | undefined | null>;

// Diff 的内置类型叫做 Exclude<T, U>
// NotNull 的内置类型叫做NonNullable<T>
// Extract<T, u>

// Extract 和 Exclude 相反
// Exclude 作用是从类型T中过滤掉可以赋值给类型U的类型
// Extract 作用是可以从类型T中抽取出可以赋值给U的类型

type T6 = Extract<"a" | "b" | "c", "a" | "e">;
type T7 = Exclude<"a" | "b" | "c", "a" | "e">;

// ReturnType<T>:可获取函数返回值类型
type T8 = ReturnType<() => string>;

// 源码

/**
 * Obtain the return type of a function type
 */
// type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// 分析
// T extends (...args: any) => any:
// ReturnType要求参数T可以赋值给一个函数,这个函数有任意的参数,返回值类型也是任意的
// 由于函数返回值类型不确定,这里使用了infer关键字,表示待推断,延迟推断,需要根据实际的情况确定

// infer R ? R : any:
// 如果实际类型是R,那么结果类型就是R,否则返回值类型就是any