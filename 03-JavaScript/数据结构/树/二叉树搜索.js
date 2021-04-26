/**
 二叉搜索树满足以下的几个性质：

 若任意节点的左子树不空，则左子树上所有节点的值均小于它的根节点的值；
 若任意节点的右子树不空，则右子树上所有节点的值均大于它的根节点的值；
 任意节点的左、右子树也需要满足左边小右边大的性质

 二叉搜索树操作:
 insert(key):向二叉树中插入一个新的健
 search(key):在二叉树中查找一个健，如果节点存在，则返回true,如果不存在，则返回false
 inOrder:通过中序遍历方式遍历所有节点
 preOrder:通过先序遍历方式遍历所有的节点
 postOrder:通过后序遍历方式遍历所有节点
 min:返回树中最小的值/健
 max:返回树中最大的值/健
 search(key):查找某个key是否存在
 remove(key):从树中移除某个键


 注意：如果insert的数据是Stirng类型，会自动转码再比较。
 **/

class Node {
	constructor(key) {
		this.key = key;
		this.left = null;
		this.right = null;
	}
}

class BinarySearchTree {
	constructor() {
		this.root = null;
	}

	// insert
	insert(key) {
		let newNode = new Node(key);
		if (this.root === null) {
			this.root = newNode;
		} else {
			this._insert(this.root, newNode);
		}
	}
	//私有方法
	_insert(node, newNode) {
		if (newNode.key < node.key) {
			//向左查找
			if (node.left === null) {
				node.left = newNode;
			} else {
				this._insert(node.left, newNode);
			}
		} else {
			//向右查找
			if (node.right === null) {
				node.right = newNode;
			} else {
				this._insert(node.right, newNode);
			}
		}
	}

	// 1.先序遍历
	preOrder(handler) {
		this._preOrder(this.root, handler);
	}
	//私有方法，对某个节点遍历,每一个节点都会遍历左右节点，从左到右
	_preOrder(node, handler) {
		if (node !== null) {
			//处理节点
			handler(node.key);
			//处理经过的左节点
			this._preOrder(node.left, handler);
			//处理经过的右节点
			this._preOrder(node.right, handler);
		}
	}

	//2.中序遍历
	inOrder(handler) {
		this._inOrder(this.root, handler);
	}
	_inOrder(node, handler) {
		if (node !== null) {
			//处理左子树中节点
			this._inOrder(node.left, handler);
			//处理节点
			handler(node.key);
			//处理右子树中的节点
			this._inOrder(node.right, handler);
		}
	}

	//3.后序遍历
	postOrder(handler) {
		this._postOrder(this.root, handler);
	}
	_postOrder(node, handler) {
		if (node !== null) {
			//处理左子树中的节点
			this._postOrder(node.left, handler);
			//处理右子树中节点
			this._postOrder(node.right, handler);
			//处理节点
			handler(node.key);
		}
	}

	//返回min值
	min() {
		let node = this.root;
		let key = null;
		while (node !== null) {
			key = node.key;
			node = node.left;
		}
		return key;
	}

	//返回max值
	max() {
		let node = this.root;
		let key = null;
		while (node !== null) {
			key = node.key;
			node = node.right;
		}
		return key;
	}

	//搜索某一个key
	search(key) {
		let node = this.root;
		//循环搜索key
		while (node !== null) {
			if (key < node.key) {
				node = node.left;
			} else if (key > node.key) {
				node = node.right;
			} else {
				return true;
			}
		}
		return false;
	}

	/**
	 * remove
	 * 1.先找到要删除的节点
	 * 2.情况一：删除叶子点
	 * 3.情况二：删除只有一个子节点的节点
	 *
	 */
	remove(key) {
		let curNode = this.root;
		let parent = null;
		let isLeftChild = true;
		//1.寻找需要删除的节点和其父节点
		while (curNode !== key) {
			parent = curNode;
			if (key < curNode.key) {
				isLeftChild = true;
				curNode = curNode.left;
			} else {
				isLeftChild = false;
				curNode = curNode.right;
			}
			//遍历到最后节点，没找到
			if (curNode === null) {
				return false;
			}
		}

		//根据对应的情况进行删除操作
		//1.删除的节点是叶子节点
		if (curNode.left === null && curNode.right === null) {
			if (curNode === this.root) {
				this.root = null;
			} else if (isLeftChild) {
				parent.left = null;
			} else {
				parent.right = null;
			}
		}
		//2.删除的节点有一个子节点
		else if (curNode.right === null) {
			if (curNode === this.root) {
				this.root = curNode;
			} else if (isLeftChild) {
				parent.left = curNode.left;
			} else {
				parent.right = curNode.left;
			}
			n;
		} else if (curNode.left === null) {
			if (curNode === this.root) {
				this.root = curNode;
			} else if (isLeftChild) {
				parent.left = curNode.right;
			} else {
				parent.right = curNode.right;
			}
		}

		//3.删除的节点有两个子节点
	}
}

const bst = new BinarySearchTree();

bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

let resultOrder = "";

//测试先序遍历
bst.preOrder(function (key) {
	resultOrder += key + ",";
});
resultOrder = resultOrder.slice(0, -1);
console.log("测试先序遍历", resultOrder);

console.log("--------------------------------");

//测试中序遍历
resultOrder = "";
bst.inOrder(function (key) {
	resultOrder += key + ",";
});
resultOrder = resultOrder.slice(0, -1);
console.log("测试中序遍历", resultOrder);

console.log("--------------------------------");

//测试后序遍历
resultOrder = "";
bst.postOrder(function (key) {
	resultOrder += key + ",";
});
resultOrder = resultOrder.slice(0, -1);
console.log("测试后序遍历", resultOrder);

console.log("--------------------------------");

const bst2 = new BinarySearchTree();

bst2.insert("安琪拉");
bst2.insert("亚瑟");
bst2.insert("王昭君");
bst2.insert("貂蝉");
bst2.insert("甄姬");
bst2.insert("娜可露露");
bst2.insert("典韦");
bst2.insert("凯");
bst2.insert("鲁班七号");

resultOrder = "";
//测试先序遍历
bst2.inOrder(function (key) {
	resultOrder += key + ",";
});
resultOrder = resultOrder.slice(0, -1);
console.log("测试中序遍历", resultOrder);
console.log("min", bst2.min());
console.log("max", bst2.max());
console.log("search 鲁班", bst2.search("鲁班"));
console.log("search 鲁班七号", bst2.search("鲁班七号"));
console.log("search 王昭君", bst2.search("王昭君"));
