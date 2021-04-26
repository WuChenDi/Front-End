// 单向链表
class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.size = 0;
		this.head = null;
		// this.last = null;
	}

	/**
	 * @method 尾部追加数据
	 * @param {any} element 追加数据
	 */
	append(element) {
		let node = new Node(element);
		if (this.head === null) {
			this.head = node;
		} else {
			let current = this.getNode(this.size - 1);
			current.next = node;
		}
		this.size++;
	}

	/**
	 * @method 指定位置追加数据
	 * @param {Number} position 位置
	 * @param {any} element 追加数据
	 */
	appendAt(position, element) {
		if (position < 0 || position > this.size) {
			throw new Error("position out range");
		}
		let node = new Node(element);
		if (position === 0) {
			node.next = this.head;
			this.head = node;
		} else {
			let pre = this.getNode(position - 1);
			node.next = pre.next;
			pre.next = node;
		}
		this.size++;
	}

	/**
	 * @method 删除指定位置数据
	 * @param {Number} position 位置
	 */
	removeAt(position) {
		if (position < 0 || position >= this.size) {
			throw new Error("position out range");
		}
		let current = this.head;
		if (position === 0) {
			this.head = current.next;
		} else {
			let pre = this.getNode(position - 1);
			current = pre.next;
			pre.next = current.next;
		}
		this.size--;
	}

	/**
	 * @method 修改指定位置数据
	 * @param {Number} position 位置
	 * @param {any} element 追加数据
	 */
	update(position, element) {
		if (position < 0 || position >= this.size) {
			throw new Error("position out range");
		}
		let pre = this.getNode(position);
		pre.element = element;
	}

	/**
	 * @method 查找指定位置数据
	 * @param {Number} position 位置
	 * @return {any} 返回数据
	 */
	getData(position) {
		if (position < 0 || position >= this.size) {
			throw new Error("position out range");
		}
		// let pre = null;
		// // 优化查找,小于size/2
		// let tempSize = this.size >> 1;
		// if (position <= tempSize) {
		// 	pre = this.head;
		// 	let i = 0;
		// 	while (i++ < position) {
		// 		pre = pre.next;
		// 	}
		// } else {
		// 	pre = this.last;
		// 	for (let j = this.size - 1; j > position; j--) {
		// 		pre = pre.previous;
		// 	}
		// }
		let pre = this.getNode(position);
		return pre.element;
	}

	/**
	 * @method 查找指定数据索引
	 * @param {any} element
	 * @return {Number} 索引
	 */
	indexOf(element) {
		let current = this.head;
		// let i = 0;
		// while (current) {
		// 	if (current.element === element) return i;
		// 	current = current.next;
		// 	i++;
		// }
		for (let i = 0; i < this.size; i++) {
			if (current.element === element) {
				return i;
			}
			current = current.next;
		}
		return -1;
	}

	/**
	 * @method 链表数据以字符串形式返回
	 * @return {String} 链表
	 */
	toString() {
		let current = this.head;
		let result = "";

		while (current) {
			result += current.element + " ";
			current = current.next;
		}

		return result;
	}

	/**
	 * @method 返回链表长度
	 * @return {Number} 链表长度
	 */
	get length() {
		return this.size;
	}

	getNode(index) {
		if (index < 0 || index >= this.size) {
			throw new Error("out range");
		}
		let current = this.head;
		let i = 0;
		while (i++ < index) {
			current = current.next;
		}
		return current;
	}
}

let ll = new LinkedList();
ll.append(1);
ll.append(2);
// ll.append(3);
// ll.append(4);

ll.appendAt(2, 4);
ll.appendAt(3, 5);
// ll.appendAt(3, 2);

// ll.removeAt(0);
// ll.removeAt(1);

console.dir(`链表数据以字符串形式返回: ${JSON.stringify(ll.toString())}`);
console.log("查找下标3的数据: ", ll.getData(3));

// console.log(ll.indexOf(1));
// console.log(ll.indexOf(2));
// console.log(ll.indexOf(3));
// console.log(ll.indexOf(4));
// console.log(ll.indexOf(5));

console.dir(ll, { depth: 100 });
console.log("链表长度: ", ll.length);

// setTimeout(() => {
// 	ll.update(3, 9);
// 	console.dir(ll, { depth: 100 });
// }, 1000);
