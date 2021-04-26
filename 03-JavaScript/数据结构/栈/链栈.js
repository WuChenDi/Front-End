/*
  栈的特点：后进先出 Last In First Out
  链栈：栈的链接存储结构成为链栈，利用链表实现，链表中的每一个元素由两部分信息组成，一部分是存储其本身的信息（数据域），一部分是存储一个指示其直接后继
  的信息，即直接后继的存储位置（指针域）。

  对于链式栈，无栈满的问题，空间可以扩充，插入与删除仅在栈顶处执行，链式栈的栈顶在链头。

  入栈操作：插入一个新元素node，只能在链接在栈顶处，指针域指向原栈顶元素(node.next = top;)，栈顶指针top再指向这个新元素(top = node)

  出栈操作：只能删除栈顶元素，删除时，栈顶指针指向原来栈顶元素的指针域。node = top; top = top.next; return node.data;

*/

class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
	}
}

/**
 * 属性：
 * length:栈的长度
 * top:栈顶指针
 *
 * 方法：
 * push:入栈
 * pop:出栈
 * peek:读栈顶数据元素
 * toSting:遍历栈将每个节点值转换为字符串，并返回结果
 * isEmpty:判断栈是否为空
 * size:栈的数据元素个数
 * clear:清除栈数据
 */
class LinkStack {
	constructor() {
		this.length = 0;
		this.top = null; // 栈顶指针
	}

	push(element) {
		let curNode;
		let node = new Node(element);
		//如果栈顶是null则新元素节点直接作为栈顶
		if (!this.top) {
			this.top = node;
		} else {
			// 将新元素节点取代栈顶，并且指向的节点是原来栈顶元素节点
			curNode = this.top;
			node.next = curNode;
			this.top = node; // 插入的新元素为栈顶
		}
		this.length++;
	}
	pop() {
		let curNode = this.top;
		if (this.top === null) {
			return null;
		}
		let element = curNode.element;
		this.top = curNode.next; // 栈顶指针指向原来栈顶元素的指针域
		this.length--;
		return element;
	}
	peek() {
		if (this.top === null) {
			return null;
		}
		return this.top.element;
	}
	toString() {
		let str = "";
		let curNode = this.top;
		while (curNode) {
			str += curNode.element + ",";
			curNode = curNode.next;
		}
		str = str.slice(0, str.length - 1);
		return str;
	}
	isEmpty() {
		return this.top === null;
	}
	size() {
		return this.length;
	}
	clear() {
		this.top = null;
		this.length = 0;
	}
}

const linkStack = new LinkStack();

let size = linkStack.size();
console.log("size:", size);

let isEmpty = linkStack.isEmpty();
console.log("isEmpty:", isEmpty);

let peek = linkStack.peek();
console.log("读取栈顶:", peek);

let pop = linkStack.pop();
console.log(pop, "出栈");

let toString = linkStack.toString();
console.log("toString:", toString);

linkStack.push("A");
linkStack.push("B");
linkStack.push("C");
linkStack.push("D");

toString = linkStack.toString();
console.log("toString:", toString);

pop = linkStack.pop();
console.log(pop, "出栈");
pop = linkStack.pop();
console.log(pop, "出栈");
pop = linkStack.pop();
console.log(pop, "出栈");

toString = linkStack.toString();
console.log("toString:", toString);

peek = linkStack.peek();
console.log("读取栈顶:", peek);

size = linkStack.size();
console.log("size:", size);
