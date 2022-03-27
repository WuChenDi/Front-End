abstract class Animal {
	eat() {
		console.log("eat");
	}
	abstract sleep(): void;
}

// let animal = new Animal();

class Dog1 extends Animal {
	constructor(name: string) {
		super();
		this.name = name;
	}
	name: string;
	run() {}
	sleep() {
		console.log("Dog1 sleep");
	}
}
let dog1 = new Dog1("wangwang");
dog1.eat();

class Cat extends Animal {
	sleep() {
		console.log("Cat sleep");
	}
}
let cat = new Cat();

let animal: Animal[] = [dog1, cat];
animal.forEach((i) => {
	i.sleep();
});

class WorkFlow {
	step1() {
		return this;
	}
	step2() {
		return this;
	}
}
new WorkFlow().step1().step2();

class Myflow extends WorkFlow {
	next() {
		return this;
	}
}

new Myflow().next().step1().next().step2();
