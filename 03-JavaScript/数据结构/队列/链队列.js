/**
    队列的特点：先进先出 First In First Out

    链式队列不存在假溢出问题。

    空的链队条件：头指针front和尾指针rear均指向头节点，即front == rear

    入队操作：将新rear.next指向新元素节点，然后将rear.next设置为rear

    出队操作：修改队头front指向，front.next = front.next.next

 */

class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
	}
}

class LinkQueue {
	constructor() {
		this.head = new Node(null);
		this.front = this.head;
		this.rear = this.head;
		this.length = 0;
	}

	isEmpty() {
		return this.front.next === null;
	}

	enqueue(element) {
		let node = new Node(element);
		this.rear.next = node; // 在这里front与rear都是指向head,对rear操作其属性是对引用数据类型操作，他们都会改变
		this.rear = node; // 在这里rear整个被重新赋值为node，引用数据类型指向node，此时之后对rear其属性操作不会改变front
		this.length++;
	}

	dequeue() {
		if (this.isEmpty()) {
			return null;
		}
		let element = this.front.next.element;
		this.front.next = this.front.next.next;
		this.length--;
		if (this.front.next == null) {
			this.rear = this.front;
		}
		return element;
	}

	getFront() {
		if (this.isEmpty()) {
			return null;
		}
		return this.front.next.element;
	}

	toString() {
		let str = "";
		let node = this.front.next;
		while (node !== null) {
			str += node.element + ",";
			node = node.next;
		}
		str = "[" + str.slice(0, -1) + "]";
		return str;
	}

	size() {
		return this.length;
	}

	/**
	 * 使头指针和尾指针均指向头节点
	 */
	clear() {
		this.front = this.head;
		this.rear = this.head;
		this.length = 0;
	}
}

linkQueue = new LinkQueue();

console.log("getFront", linkQueue.getFront());
console.log("toString", linkQueue.toString());
console.log("size", linkQueue.size());

console.log("------------------------");
linkQueue.enqueue("A");
linkQueue.enqueue("B");
linkQueue.enqueue("C");
linkQueue.enqueue("D");
linkQueue.enqueue("E");

console.log("getFront", linkQueue.getFront());
console.log("toString", linkQueue.toString());
console.log("size", linkQueue.size());
console.log("------------------------");

console.log(linkQueue.dequeue(), "出队列");
console.log(linkQueue.dequeue(), "出队列");
console.log(linkQueue.dequeue(), "出队列");
console.log(linkQueue.dequeue(), "出队列");

console.log("getFront", linkQueue.getFront());
console.log("toString", linkQueue.toString());
console.log("size", linkQueue.size());

console.log("------------------------");
linkQueue.clear();
console.log("getFront", linkQueue.getFront());
console.log("toString", linkQueue.toString());
console.log("size", linkQueue.size());

console.log("------------------------");
linkQueue.enqueue("F");
linkQueue.enqueue("G");
console.log("getFront", linkQueue.getFront());
console.log("toString", linkQueue.toString());
console.log("size", linkQueue.size());
