function Person(name) {
    this.name = name;
}

Person.prototype = {
    constructor: Person,
    showName() {
        console.log(this.name)
    }
}

var person = new Person('wcd')
person.showName()

var animal = {
    name: 'cat'
}

person.showName.call(animal)

person.showName.apply(animal)

person.showName.bind(animal)