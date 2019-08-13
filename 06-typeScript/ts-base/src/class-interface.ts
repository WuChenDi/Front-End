interface Human {
    // new(name: string): void
    name: string
    eat(): void
}

// 类实现接口的时候，必须实现接口所有声明的属性
// 接口只能约束类的共有成员
class Asion implements Human {
    constructor(name: string) {
        this.name = name
    }
    name: string
    eat() { }
    sleep() { }
}

interface Man extends Human {
    run(): void
}

interface Child {
    cry(): void
}

interface Boy extends Man, Child { }

let boy: Boy = {
    name: '',
    run() { },
    eat() { },
    cry() { }
}

class Auto {
    state = 1
    // private state2 = 0
}
interface AutoInterface extends Auto {

}
class C implements AutoInterface {
    state = 1
}

class Bus extends Auto implements AutoInterface {

}
