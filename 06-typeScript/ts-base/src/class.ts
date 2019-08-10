// 类
class Dog {
    // private / protected constructor(name: string) {
    constructor(name: string) {
        // 实例的属性必须有初始值，或者在构造函数中被初始化
        this.name = name
    }
    public name: string
    // name: string = 'dog'
    run() { }
    // 私有成员，只能在类的本省调用，而不能被类的实例调用，也不能被子类调用
    private pri() { }
    // 受保护成员，只能在类或者子类访问，而不能在类的实例访问
    protected pro() { }
    // 只读属性，这个属性不能被更改，而且不能被更改
    readonly legs: number = 4
    // 静态成员，只能听过类名来调用，而不能通实例
    static food: string = 'bones'
}

console.log(Dog.prototype)
let dog = new Dog('wangwang')
console.log(dog)
// dog.pri()
// dog.pro()
console.log(Dog.food)

// 继承
class Husky extends Dog {
    constructor(name: string, public color: string) {
        super(name)
        this.color = color;
        // this.pri()
        this.pro()
    }
    // color: string
}
console.log(Husky.food)