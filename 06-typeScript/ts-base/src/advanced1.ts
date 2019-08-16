/**
 * X 兼容 Y: X (目标类型) = Y (源类型)
 */

let s: string = 'a'
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

// let x: X = { a: 1, b: 2 }
let y: Y = { a: a, b: 2, c: 3 }
x = y
// y = x

// 函数兼容性
type Handler = (a: number, b: number) => void
function hof(hadler: Handler) {
    return hadler
}

// 1) 参数个数
let hadler1 = (a: number) => { }
hof(hadler1)

let hadler2 = (a: number, b: number, c: number) => { }
// hof(hadler2)

{
    // 可选参数和剩余参数
    let a = (p1: number, p2: number) => { }
    let b = (p1?: number, p2?: number) => { }
    let c = (...args: number[]) => { }
    // a = b
    // a = c
    // b = c
    // b = a
    // c = a
    // c = b
}

// 2) 参数类型
let hadler3 = (a: number) => { }
// hof(hadler3)

interface Point3D {
    x: number;
    y: number;
    z: number
}
interface Point2D {
    x: number;
    y: number
}

let p3d = (ponit: Point3D) => { };
let p2d = (ponit: Point2D) => { };
// p3d = p2d
// p2d = p3d