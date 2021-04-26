/**
 使用限制数组长度实现的循环队列，循环队列的优点是不存在队列假溢满问题，不需要进行数据迁移

 length:存储循环队列的长度
 datas:存储循环队列数据的数组
 front:指向队列的队头元素，初始值0
 rear:指向队列的队尾元素，初始值0


 入队操作：入队的时候将队尾指针rear+1，再将元素按rear指示位置加入，但当rear指向最后一个位置的时候，
 如果可以再加入元素（0位置元素已经出队列），则rear应该指向0，故队尾指示器加1的操作应该改为  this.rear = ( this.rear +1 ) % this.length

 出队操作：先将队头指针front+1,再将front所指示的元素取出，但当front指向队列最后一个位置并且仍然可以有元素可以出队，
 则front应该指向0，故队头指示器加1操作应该改为  this.front = (this.front + 1) % this.length

 求队列元素长度操作： return ( this.rear - this.front + this.length ) % this.length

 取出队列头元素：如果队列不为空，返回 this.datas[ (this.front + 1 ) % this.length ]

 判满操作：在做判断队列是否满约定少使用一个队列存储空间，而不是设立一个flag计算队列数据个数判断，如果数据非常大这样可以减少系统开销
 那么队列为满的条件是：(this.rear+1) % this.length === this.front

 判空操作，front == rear
 */

class SequenceQueue {
	constructor(length) {
		this.length = length + 1; // 约定少用一个数组存储空间来判断队列是否满，为了满足用户需要length个数据，将length+1处理
		this.datas = [];
		this.front = 0;
		this.rear = 0;
	}

	isEmpty() {
		return this.rear === this.front;
	}

	isFull() {
		return (this.rear + 1) % this.length === this.front;
	}

	/**
	 * 入队的时候将队尾指针rear+1，再将元素按rear指示位置加入
	 * @param item
	 * @returns {boolean}
	 */
	enqueue(item) {
		if (this.isFull()) {
			return false;
		}
		this.rear = (this.rear + 1) % this.length;
		this.datas[this.rear] = item;
	}

	/**
	 * 先将队头指针front+1,再将front所指示的元素取出
	 * @returns {*}
	 */
	dequeue() {
		if (this.isEmpty()) {
			return null;
		}
		this.front = (this.front + 1) % this.length;
		let result = this.datas[this.front];
		delete this.datas[this.front];
		return result;
	}

	/**
	 * 取出队列头元素
	 * @returns {*}
	 */
	getFront() {
		if (this.isEmpty()) {
			return null;
		}
		return this.datas[(this.front + 1) % this.length];
	}

	/**
	 * 队列中数据元素个数
	 * @returns {number}
	 */
	size() {
		return (this.rear - this.front + this.length) % this.length;
	}

	/**
	 *
	 * @returns {string}
	 * 注意这里toString不能简单地见this.datas元素直接遍历输出，要根据队列实际有效数据输出
	 */
	toString() {
		let i,
			j = this.front;
		let str = "";
		for (i = 0; i < this.size(); i++) {
			j = (j + 1) % this.length;
			str += this.datas[j] + ",";
		}
		str = str.slice(0, -1);
		return str;
	}

	clear() {
		this.front = this.rear = 0;
		this.datas = [];
	}
}

const sequenceQueue = new SequenceQueue(5);

console.log("isEmpty", sequenceQueue.isEmpty());
console.log("isFull", sequenceQueue.isFull());

let front = sequenceQueue.getFront();
console.log("front", front);

let size = sequenceQueue.size();
console.log("size", size);

let toStr = sequenceQueue.toString();
console.log("toStr", toStr);
console.log("---------1------------");

sequenceQueue.enqueue("A");
sequenceQueue.enqueue("B");
sequenceQueue.enqueue("C");
sequenceQueue.enqueue("D");
sequenceQueue.enqueue("E");
sequenceQueue.enqueue("F");

console.log("isEmpty", sequenceQueue.isEmpty());
console.log("isFull", sequenceQueue.isFull());

size = sequenceQueue.size();
console.log("size", size);

front = sequenceQueue.getFront();
console.log("front", front);

toStr = sequenceQueue.toString();
console.log("toStr", toStr);
console.log("--------2-------------");

let item = sequenceQueue.dequeue();
console.log(item, "出队列");
item = sequenceQueue.dequeue();
console.log(item, "出队列");
item = sequenceQueue.dequeue();
console.log(item, "出队列");

front = sequenceQueue.getFront();
console.log(item, "出队列之后front", front);

toStr = sequenceQueue.toString();
console.log("toStr", toStr);
console.log("---------3------------");

console.log("队列数组真实元素", sequenceQueue.datas);

console.log("---------4------------");
sequenceQueue.clear();
toStr = sequenceQueue.toString();
console.log("after clear toStr", toStr);
console.log("----------5-----------");
console.log("after clear  队列数组真实元素", sequenceQueue.datas);
