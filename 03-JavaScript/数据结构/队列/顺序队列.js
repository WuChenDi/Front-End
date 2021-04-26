/**
 *  队列特点：允许插入的一端是队尾，允许删除的一端是队列头，即先进先出,FIFO（First In First Out）
    顺序队列：用一组地址连续的存储单元依次存放从队列头到队列尾的元素的队列

    队列的基本操作：
    入队：将新元素追加到队列尾
    出队：删除队列头元素，并且返回元素值
    获取头元素：仅仅返回头元素的值
    求队列长度:求出队列中数据元素的个数
    判断空:判断当前队列是否为空
    输出队列：返回队列中所有的元素
    销毁:清空队列

    若果数组长度限制，那么顺序队列会存在假溢满问题，这样子可能需要进行数据迁移，这样是非常消耗性能的，
    由于js数组没有最大长度限制（除非内存溢出），所以js版本的顺序队列没有溢出问题

 */

class ArrayQueue {
	constructor() {
		this.datas = [];
	}

	enqueue(item) {
		this.datas.push(item);
	}

	dequeue() {
		return this.datas.shift();
	}

	front() {
		if (this.isEmpty()) {
			return null;
		}
		return this.datas[0];
	}

	isEmpty() {
		return this.datas.length === 0;
	}

	size() {
		return this.datas.length;
	}

	toString() {
		return "[" + this.datas.toString() + "]";
	}
}

const queue = new ArrayQueue();

console.log("isEmpty", queue.isEmpty());
console.log("size", queue.size());
console.log("front", queue.front());
console.log("toString", queue.toString());
console.log("----------------------------------");

queue.enqueue("A");
queue.enqueue("B");
queue.enqueue("C");
queue.enqueue("D");
queue.enqueue("E");

console.log("isEmpty", queue.isEmpty());
console.log("size", queue.size());
console.log("front", queue.front());
console.log("toString", queue.toString());
console.log("----------------------------------");

let item = null;
item = queue.dequeue();
for (let i = 0; i < 3; i++) {
	console.log(item, "出队列");
	item = queue.dequeue();
}
console.log("isEmpty", queue.isEmpty());
console.log("size", queue.size());
console.log("front", queue.front());
console.log("toString", queue.toString());
