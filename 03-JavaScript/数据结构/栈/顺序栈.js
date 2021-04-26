/**
 栈，又叫堆栈,比列表高效，因为栈内的元素只能通过列表的一端访问，称为栈顶，数据只能在栈顶添加或删除，
 遵循 先入后出(LIFO，last-in-first-out) 的原则，
 普遍运用于计算机的方方面面

 顺序栈：利用一组地址连续的存储单元一次存放自栈底到栈顶的数据元素，把数组中下标为0的一端作为栈底

 对栈的操作主要有两种，
 一是将一个元素压入栈，push方法，
 另一个就是将栈顶元素出栈，pop方法。

 属性：
 stackArray:存储栈数据
 方法：
 pop:出栈，删除栈顶元素,并且返回该值
 push:入栈，在栈顶将新元素入栈
 peek:查看当前栈顶元素,仅仅是查看，并不删除
 isEmpty:判断是否为空
 size:查看当前栈元素的总数
 clear:清空栈内元素
 toString:遍历栈查看所有元素
 */

class ArraySatck {
	constructor() {
		this.datas = [];
	}
	isEmpty() {
		return this.datas.length === 0;
	}
	size() {
		return this.datas.length;
	}
	push(item) {
		this.datas.push(item);
	}
	pop() {
		if (this.isEmpty()) {
			return null;
		}
		return this.datas.pop(); // 原生js数组pop方法删除最后一个元素并且返回
	}
	peek() {
		if (this.isEmpty()) {
			return null;
		}
		return this.datas[this.size() - 1];
	}
	clear() {
		this.datas = [];
	}
	toString() {
		return this.datas.toString();
	}
}

const arraySatck = new ArraySatck();

let isEmp = arraySatck.isEmpty();
console.log("是否为空", isEmp);

length = arraySatck.size();
console.log("栈长度", length);

let pop = arraySatck.pop();
console.log(pop + "出栈");

let peek = arraySatck.peek();
console.log("查看栈顶", peek);

let str = arraySatck.toString();
console.log("toSting", str);

arraySatck.push("A");
arraySatck.push("B");
arraySatck.push("C");
arraySatck.push("D");
arraySatck.push("E");

isEmp = arraySatck.isEmpty();
console.log("是否为空", isEmp);

length = arraySatck.size();
console.log(length);

pop = arraySatck.pop();
console.log(pop + "出栈");

pop = arraySatck.pop();
console.log(pop + "出栈");

peek = arraySatck.peek();
console.log("查看栈顶", peek);

str = arraySatck.toString();
console.log("toSting", str);

arraySatck.clear();

str = arraySatck.toString();
console.log("after clear toSting", str);

let arr = arraySatck.datas;
console.log("datas", arr);
