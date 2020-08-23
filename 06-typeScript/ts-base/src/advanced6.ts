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
