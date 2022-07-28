// Uppercase
// 构建一个类型的所有属性都设置为大写的类型
{
  type Role = "admin" | "user" | "guest";

  // Bad practice 💩
  // type UppercaseRole = "ADMIN" | "USER" | "GUEST";

  // Good practice ✅
  type UppercaseRole = Uppercase<Role>; // "ADMIN" | "USER" | "GUEST"
}

// Lowercase
// 构建一个类型的所有属性都设置为小写的类型。与 Uppercase 相反。
{
  type Role = "ADMIN" | "USER" | "GUEST";

  // Bad practice 💩
  // type LowercaseRole = "admin" | "user" | "guest";

  // Good practice ✅
  type LowercaseRole = Lowercase<Role>; // "admin" | "user" | "guest"
}

// Capitalize
// 构建一个类型的所有属性都设置为大写开头的类型。
{
  type Role = "admin" | "user" | "guest";

  // Bad practice 💩
  // type CapitalizeRole = "Admin" | "User" | "Guest";

  // Good practice ✅
  type CapitalizeRole = Capitalize<Role>; // "Admin" | "User" | "Guest"
}

// Uncapitalize
// 构建一个类型的所有属性都设置为非大写的类型。与 Capitalize 相反。
{
  type Role = "Admin" | "User" | "Guest";

  // Bad practice 💩
  // type UncapitalizeRole = "admin" | "user" | "guest";

  // Good practice ✅
  type UncapitalizeRole = Uncapitalize<Role>; // "admin" | "user" | "guest"
}

// Partial
// 构建一个类型的所有属性都设置为可选的类型。
{
  interface User {
    name: string;
    age: number;
    password: string;
  }

  // Bad practice 💩
  // interface PartialUser {
  //   name?: string;
  //   age?: number;
  //   password?: string;
  // }

  // Good practice ✅
  type PartialUser = Partial<User>;
}

// Required
// 构建一个由Type的所有属性组成的类型，设置为必填。与Partial相反。
{
  interface User {
    name?: string;
    age?: number;
    password?: string;
  }

  // Bad practice 💩
  // interface RequiredUser {
  //   name: string;
  //   age: number;
  //   password: string;
  // }

  // Good practice ✅
  type RequiredUser = Required<User>;
}

// Readonly
// 构建一个由Type的所有属性组成的类型，设置为只读。
{
  interface User {
    role: string;
  }

  // Bad practice 💩
  // const user: User = { role: "ADMIN" };
  // user.role = "USER";

  // Good practice ✅
  type ReadonlyUser = Readonly<User>;
  const user: ReadonlyUser = { role: "ADMIN" };
  // user.role = "USER"; // Error: Cannot assign to 'role' because it is a read-only property.
}

// Record
// Record是一个很好用的工具类型。他会将一个类型的所有属性值都映射到另一个类型上并创造一个新的类型，
{
  interface Address {
    street: string;
    pin: number;
  }

  interface Addresses {
    home: Address;
    office: Address;
  }

  // 或者
  type AddressesRecord = Record<"home" | "office", Address>;
}

// Pick
// 从一个复合类型中，取出几个想要的类型的组合
{
  interface User {
    name: string;
    age: number;
    password: string;
  }

  // Bad practice 💩
  // interface UserPartial {
  //   name: string;
  //   age: number;
  // }

  // Good practice ✅
  type UserPartial = Pick<User, "name" | "age">;
}

// Omit
// 以一个类型为基础支持剔除某些属性，然后返回一个新类型。
{
  interface User {
    name: string;
    age: number;
    password: string;
  }

  // Bad practice 💩
  // interface UserPartial {
  //   name: string;
  //   age: number;
  // }

  // Good practice ✅
  type UserPartial = Omit<User, "password">;
}

// Exclude
// Exclude<T, U>，该工具类型能够从类型T中剔除所有可以赋值给类型U的类型。
{
  type Role = "ADMIN" | "USER" | "GUEST";

  // Bad practice 💩
  type NonAdminRole = "USER" | "GUEST";

  // Good practice ✅
  type NonAdmin = Exclude<Role, "ADMIN">; // "USER" | "GUEST"
}

// Extract
// Extract 的功能，与 Exclude 相反，它是 提取 T 中可以赋值给 U 的类型。
{
  type Role = "ADMIN" | "USER" | "GUEST";

  // Bad practice 💩
  type AdminRole = "ADMIN";

  // Good practice ✅
  type Admin = Extract<Role, "ADMIN">; // "ADMIN"
}

// NonNullable
// 构建一个类型的所有属性都设置为非空的类型。
{
  type Role = "ADMIN" | "USER" | null;

  // Bad practice 💩
  // type NonNullableRole = "ADMIN" | "USER";

  // Good practice ✅
  type NonNullableRole = NonNullable<Role>; // "ADMIN" | "USER"
}
