let a = 1
let b = [1]
let b1 = [1, null]

let c = (x = 1) => { }
let c1 = (x = 1) => x + 1

window.onkeydown = (event) => {
    // console.log(event.button)
}

interface Foo {
    bar: number
}
// let foo = {} as Foo
// foo.bar = 1
let foo: Foo = {
    bar: 1
}