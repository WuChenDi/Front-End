// let add: (x: number, y: number) => number

// interface Add {
//   (x: number, y: number): number
// }

// type Add = (x: number, y: number) => number

// let add: Add = (a, b) => a + b

interface Lib {
  (): void;
  version: string;
  doSomething(): void;
}

function getLib() {
  let lib: Lib = (() => { }) as Lib;
  lib.version = "1.0";
  lib.doSomething = () => { };
  return lib;
}

let lib1 = getLib();
lib1();
lib1.doSomething();
let lib2 = getLib();
