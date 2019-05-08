const EventEmitter = require('events').EventEmitter



// const emitter1 = new EventEmitter()
// emitter1.on('some', () => {
//     // 监听 some 事件
//     console.log('some event is occured 1')
// })
// emitter1.on('some', () => {
//     // 监听 some 事件
//     console.log('some event is occured 2')
// })
// // 触发 some 事件
// emitter1.emit('some')




// const emitter = new EventEmitter()
// emitter.on('sbowName', name => {
//     console.log('event occured ', name)
// })
// emitter.emit('sbowName', 'zhangsan')  // emit 时候可以传递参数过去




// 任何构造函数都可以继承 EventEmitter 的方法 on emit
class Dog extends EventEmitter {
    constructor(name) {
        super()
        this.name = name
    }
}
var simon = new Dog('simon')
simon.on('bark', function () {
    console.log(this.name, ' barked')
})
setInterval(() => {
    simon.emit('bark')
}, 500)
