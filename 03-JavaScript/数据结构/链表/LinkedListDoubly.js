// 双向链表
class DoublyNode {
	constructor(element) {
		this.element = element;
		this.prev = null;
		this.next = null;
	}
}

class DoublyLinkedList {
	constructor() {
		this.size = 0;
		this.head = null;
		this.tail = null;
	}

	/**
	 * @method 尾部追加数据
	 * @param {any} element 追加数据
	 */
	append(element) {
		let node = new DoublyNode(element);
		if (this.head === null) {
			this.head = node;
			this.tail = node;
		} else {
			this.tail.next = node;
			node.prev = this.tail;
			this.tail = node;
		}
		this.size++;
	}

	/**
	 * @method 指定位置追加数据
	 * @param {*} position 位置
	 * @param {*} element 追加数据
	 */
	appendAt(position, element) {
		if (position < 0 || position > this.size) {
			throw new Error("position out range");
		}
		let node = new DoublyNode(element);
		if (position === 0) {
			if (this.head === null) {
				this.head = node;
				this.tail = node;
			} else {
				node.next = this.head;
				this.head.perv = node;
				this.head = node;
			}
		} else if (position === this.size) {
			this.tail.next = node;
			node.prev = this.tail;
			this.tail = node;
		} else {
			let pre = this.getNode(position - 1);
			pre.next = node;
			node.prev = pre;
			node.next = pre.next;
			pre.prev = node;
		}
		this.size++;
	}

	/**
	 * @method 删除指定位置数据
	 * @param {*} position 位置
	 */
	removeAt(position) {
		if (position < 0 || position >= this.size) {
			throw new Error("position out range");
		}
		let current = this.head;
		if (position === 0) {
			if (this.size === 1) {
				this.head = null;
				this.tail = null;
			} else {
				this.head = current.next;
				this.head.prev = null;
			}
		} else if (position === this.size - 1) {
			this.tail.prev.next = null;
			this.tail = this.tail.prev;
		} else {
			let pre = this.getNode(position - 1);
			current = pre.next;
			pre.next = current.next;
      current.next.prev = pre;
		}
		this.size--;
	}

	/**
	 * @method 修改指定位置数据
	 * @param {Number} position 位置
	 * @param {any} element 追加数据
	 * TODO: 性能优化点 this.size / 2 > position 从头向后遍历, 反之则反
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
	 * TODO: 性能优化点 this.size / 2 > position 从头向后遍历, 反之则反
	 */
	getData(position) {
		if (position < 0 || position >= this.size) {
			throw new Error("position out range");
		}
		let pre = this.getNode(position);
		return pre.element;
	}

	/**
	 * @method 查找指定数据索引
	 * @param {Number} element
	 * @return {Number} 索引
	 */
	indexOf(element) {
		let current = this.head;
		for (let i = 0; i < this.size; i++) {
			if (current.element === element) {
				return i;
			}
			current = current.next;
		}
		return -1;
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
		for (let i = 0; i < index; i++) {
			current = current.next;
		}
		return current;
	}
}

let ll = new DoublyLinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.append(4);
// ll.appendAt(2, 3);
// ll.appendAt(3, 4);
// ll.appendAt(3, 2);
// ll.removeAt(0);
ll.removeAt(1);

// console.log(ll.getData(3));

// console.log(ll.indexOf(1));
// console.log(ll.indexOf(2));
// console.log(ll.indexOf(3));
// console.log(ll.indexOf(4));
// console.log(ll.indexOf(5));

console.dir(ll, {
	depth: 100,
});
console.log(ll.length);

// setTimeout(() => {
// 	ll.update(3, 9);
// 	console.dir(ll, {
// 		depth: 100,
// 	});
// }, 1000);
