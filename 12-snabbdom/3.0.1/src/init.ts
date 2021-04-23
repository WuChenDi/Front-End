import { Module } from "./modules/module";
import { vnode, VNode } from "./vnode";
import * as is from "./is";
import { htmlDomApi, DOMAPI } from "./htmldomapi";

type NonUndefined<T> = T extends undefined ? never : T;

function isUndef(s: any): boolean {
	return s === undefined;
}
function isDef<A>(s: A): s is NonUndefined<A> {
	return s !== undefined;
}

type VNodeQueue = VNode[];

const emptyNode = vnode("", {}, [], undefined, undefined);

function sameVnode(vnode1: VNode, vnode2: VNode): boolean {
	// key 和 sel 都相等
	// 如果 key 没有传入 => undefined === undefined // true
	// 不传 key 情况分析：不在循环体里面，像直接定义的情况，直接通过 tag/sel 来比较
	const isSameKey = vnode1.key === vnode2.key;
	const isSameIs = vnode1.data?.is === vnode2.data?.is;
	const isSameSel = vnode1.sel === vnode2.sel;

	return isSameSel && isSameKey && isSameIs;
}

function isVnode(vnode: any): vnode is VNode {
	return vnode.sel !== undefined;
}

type KeyToIndexMap = { [key: string]: number };

type ArraysOf<T> = {
	[K in keyof T]: Array<T[K]>;
};

type ModuleHooks = ArraysOf<Required<Module>>;

function createKeyToOldIdx(
	children: VNode[],
	beginIdx: number,
	endIdx: number
): KeyToIndexMap {
	const map: KeyToIndexMap = {};
	for (let i = beginIdx; i <= endIdx; ++i) {
		const key = children[i]?.key;
		if (key !== undefined) {
			map[key as string] = i;
		}
	}
	return map;
}

const hooks: Array<keyof Module> = [
	"create",
	"update",
	"remove",
	"destroy",
	"pre",
	"post",
];

export function init(modules: Array<Partial<Module>>, domApi?: DOMAPI) {
	let i: number;
	let j: number;
	// cbs 用于收集 module 中的 hook
	const cbs: ModuleHooks = {
		create: [],
		update: [],
		remove: [],
		destroy: [],
		pre: [],
		post: [],
	};

	const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi;

	// 收集 module 中的 hook
	for (i = 0; i < hooks.length; ++i) {
		cbs[hooks[i]] = [];
		for (j = 0; j < modules.length; ++j) {
			const hook = modules[j][hooks[i]];
			if (hook !== undefined) {
				(cbs[hooks[i]] as any[]).push(hook);
			}
		}
	}

	function emptyNodeAt(elm: Element) {
		const id = elm.id ? "#" + elm.id : "";
		const c = elm.className ? "." + elm.className.split(" ").join(".") : "";
		return vnode(
			api.tagName(elm).toLowerCase() + id + c,
			{},
			[],
			undefined,
			elm
		);
	}

  // 只有当所有的 remove hook 都调用了 remove callback 才会移除 dom
	function createRmCb(childElm: Node, listeners: number) {
		return function rmCb() {
			if (--listeners === 0) {
				const parent = api.parentNode(childElm) as Node;
				api.removeChild(parent, childElm);
			}
		};
	}

	// 创建真正的 dom 节点
	function createElm(vnode: VNode, insertedVnodeQueue: VNodeQueue): Node {
		let i: any;
		let data = vnode.data;
		if (data !== undefined) {
			// 调用 init hook
			const init = data.hook?.init;
			if (isDef(init)) {
				init(vnode);
				data = vnode.data;
			}
		}
		const children = vnode.children;
		const sel = vnode.sel;
		// 注释节点
		if (sel === "!") {
			if (isUndef(vnode.text)) {
				vnode.text = "";
			}
			// 创建注释节点
			vnode.elm = api.createComment(vnode.text!);
		} else if (sel !== undefined) {
			// Parse selector
			const hashIdx = sel.indexOf("#");
			const dotIdx = sel.indexOf(".", hashIdx);
			const hash = hashIdx > 0 ? hashIdx : sel.length;
			const dot = dotIdx > 0 ? dotIdx : sel.length;
			const tag =
				hashIdx !== -1 || dotIdx !== -1
					? sel.slice(0, Math.min(hash, dot))
					: sel;
			const elm = (vnode.elm =
				isDef(data) && isDef((i = data.ns))
					? api.createElementNS(i, tag, data)
					: api.createElement(tag, data));

			if (hash < dot) elm.setAttribute("id", sel.slice(hash + 1, dot));
			if (dotIdx > 0) elm.setAttribute("class", sel.slice(dot + 1).replace(/\./g, " "));

      // 调用 create hook
			for (i = 0; i < cbs.create.length; ++i) cbs.create[i](emptyNode, vnode);
			
      // 挂载子节点（递归创建节点）
      if (is.array(children)) {
				for (i = 0; i < children.length; ++i) {
					const ch = children[i];
					if (ch != null) {
						api.appendChild(elm, createElm(ch as VNode, insertedVnodeQueue));
					}
				}
			} else if (is.primitive(vnode.text)) {
				api.appendChild(elm, api.createTextNode(vnode.text));
			}
			const hook = vnode.data!.hook;
			if (isDef(hook)) {
        // 调用 create hook
				hook.create?.(emptyNode, vnode);
				if (hook.insert) {
          // insert hook 存储起来 等 dom 插入后才会调用，这里用个数组来保存能避免调用时再次对 vnode 树做遍历
					insertedVnodeQueue.push(vnode);
				}
			}
		} else {
      // 文本节点
			vnode.elm = api.createTextNode(vnode.text!);
		}
		return vnode.elm;
	}

	function addVnodes(
		parentElm: Node,
		before: Node | null,
		vnodes: VNode[],
		startIdx: number,
		endIdx: number,
		insertedVnodeQueue: VNodeQueue
	) {
		for (; startIdx <= endIdx; ++startIdx) {
			const ch = vnodes[startIdx];
			if (ch != null) {
				api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
			}
		}
	}

	// 调用 destory hook
	// 如果存在 children 递归调用
	function invokeDestroyHook(vnode: VNode) {
		const data = vnode.data;
		if (data !== undefined) {
			data?.hook?.destroy?.(vnode);
			for (let i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
			if (vnode.children !== undefined) {
				for (let j = 0; j < vnode.children.length; ++j) {
					const child = vnode.children[j];
					if (child != null && typeof child !== "string") {
						invokeDestroyHook(child);
					}
				}
			}
		}
	}

	function removeVnodes(
		parentElm: Node,
		vnodes: VNode[],
		startIdx: number,
		endIdx: number
	): void {
		for (; startIdx <= endIdx; ++startIdx) {
			let listeners: number;
			let rm: () => void;
			const ch = vnodes[startIdx];
			if (ch != null) {
				if (isDef(ch.sel)) {
					// 调用 destroy hook
					invokeDestroyHook(ch);
					// 移除 DOM 元素
					listeners = cbs.remove.length + 1;
					rm = createRmCb(ch.elm!, listeners);
          // 调用 remove hook
					for (let i = 0; i < cbs.remove.length; ++i) cbs.remove[i](ch, rm);
					const removeHook = ch?.data?.hook?.remove;
					if (isDef(removeHook)) {
						removeHook(ch, rm);
					} else {
						rm();
					}
				} else {
					// Text node
					api.removeChild(parentElm, ch.elm!);
				}
			}
		}
	}

	function updateChildren(
		parentElm: Node,
		oldCh: VNode[],
		newCh: VNode[],
		insertedVnodeQueue: VNodeQueue
	) {
		let oldStartIdx = 0;
		let newStartIdx = 0;
		let oldEndIdx = oldCh.length - 1;
		let oldStartVnode = oldCh[0];
		let oldEndVnode = oldCh[oldEndIdx];
		let newEndIdx = newCh.length - 1;
		let newStartVnode = newCh[0];
		let newEndVnode = newCh[newEndIdx];
		let oldKeyToIdx: KeyToIndexMap | undefined;
		let idxInOld: number;
		let elmToMove: VNode;
		let before: any;

		// 遍历 oldCh newCh，对节点进行比较和更新
		// 每轮比较最多处理一个节点，算法复杂度 O(n)
		while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
			if (oldStartVnode == null) {
				oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
			} else if (oldEndVnode == null) {
				oldEndVnode = oldCh[--oldEndIdx];
			} else if (newStartVnode == null) {
				newStartVnode = newCh[++newStartIdx];
			} else if (newEndVnode == null) {
				newEndVnode = newCh[--newEndIdx];
			}
			// 以旧 vnode 首节点和新 vnode 首节点对比
			else if (sameVnode(oldStartVnode, newStartVnode)) {
				patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
				oldStartVnode = oldCh[++oldStartIdx];
				newStartVnode = newCh[++newStartIdx];
			}
			// 以旧 vnode 尾节点和新 vnode 尾节点对比
			else if (sameVnode(oldEndVnode, newEndVnode)) {
				patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
				oldEndVnode = oldCh[--oldEndIdx];
				newEndVnode = newCh[--newEndIdx];
			}
			// 以旧 vnode 首节点和新 vnode 尾节点对比
			else if (sameVnode(oldStartVnode, newEndVnode)) {
				// Vnode moved right
				patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
				api.insertBefore(
					parentElm,
					oldStartVnode.elm!,
					api.nextSibling(oldEndVnode.elm!)
				);
				oldStartVnode = oldCh[++oldStartIdx];
				newEndVnode = newCh[--newEndIdx];
			}
			// 以旧 vnode 尾节点和新 vnode 新节点对比
			else if (sameVnode(oldEndVnode, newStartVnode)) {
				// Vnode moved left
				patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
				api.insertBefore(parentElm, oldEndVnode.elm!, oldStartVnode.elm!);
				oldEndVnode = oldCh[--oldEndIdx];
				newStartVnode = newCh[++newStartIdx];
			}
			// 以上4中都未命中
			else {
				if (oldKeyToIdx === undefined) {
					oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
				}
				// 拿新节点 key ， 能否对应上 oldCh 中的某个节点的 key
				idxInOld = oldKeyToIdx[newStartVnode.key as string];

				// 对应不上
				if (isUndef(idxInOld)) {
					// New element
					api.insertBefore(
						parentElm,
						createElm(newStartVnode, insertedVnodeQueue),
						oldStartVnode.elm!
					);
				}
				// 对应上了
				else {
					// 拿到对应上 key 的节点
					elmToMove = oldCh[idxInOld];
					// sel 是否相等（sameVnode 条件）
					// sel 不相等，key相等
					if (elmToMove.sel !== newStartVnode.sel) {
						// New element
						api.insertBefore(
							parentElm,
							createElm(newStartVnode, insertedVnodeQueue),
							oldStartVnode.elm!
						);
					}
					// sel 相等，key 相等
					else {
						patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
						oldCh[idxInOld] = undefined as any;
						api.insertBefore(parentElm, elmToMove.elm!, oldStartVnode.elm!);
					}
				}
				// 更新之后，调整指针
				newStartVnode = newCh[++newStartIdx];
			}
		}
		// oldCh 已经全部处理完成，而 newCh 还有新的节点，需要对剩下的每个项都创建新的 dom
		if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
			if (oldStartIdx > oldEndIdx) {
				before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
				addVnodes(
					parentElm,
					before,
					newCh,
					newStartIdx,
					newEndIdx,
					insertedVnodeQueue
				);
			} else {
				// newCh 已经全部处理完成，而 oldCh 还有旧的节点，需要将多余的节点移除
				removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
			}
		}
	}

	function patchVnode(
		oldVnode: VNode,
		vnode: VNode,
		insertedVnodeQueue: VNodeQueue
	) {
		// 执行 prepatch hook
		const hook = vnode.data?.hook;
		hook?.prepatch?.(oldVnode, vnode);
		// 设置 vnode.elm
		const elm = (vnode.elm = oldVnode.elm)!;
		// 旧 children
		const oldCh = oldVnode.children as VNode[];
		// 新 children
		const ch = vnode.children as VNode[];
		// 如果 oldVnode 和 vnode 是完全相同，说明无需更新，直接返回。
    // 极少这种情况，除非人为测试
		if (oldVnode === vnode) return;
		// hook 相关
		if (vnode.data !== undefined) {
      // 调用 update hook
			for (let i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);

      // 调用 vnode update hook
			vnode.data.hook?.update?.(oldVnode, vnode);
		}
		// 新test(vnode.text) === undefined (vnode.children != undefined) / (vnode.children 一般有值)
		// text 与 children 不可能共存，但是都为 undefined 成立
		if (isUndef(vnode.text)) {
			// 新旧都有 children
			if (isDef(oldCh) && isDef(ch)) {
				// 新旧节点都存在 children 就执行 updateChildren
				if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
			}
			// 存在新 children，不存在旧 children（有可能存在旧 text）
			else if (isDef(ch)) {
				// 如果旧 text 存在值，先置空
				if (isDef(oldVnode.text)) api.setTextContent(elm, "");
				// 添加 children
				addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
			}
			// 存在旧 children，不存在新 children（有可能存在旧 text）
			else if (isDef(oldCh)) {
				// 移除旧节点的 children
				removeVnodes(elm, oldCh, 0, oldCh.length - 1);
			} else if (isDef(oldVnode.text)) {
				// 旧节点存在 text 置空
				api.setTextContent(elm, "");
			}
		}
		// else: vnode.text !== undefined (vnode.children 无值)
		else if (oldVnode.text !== vnode.text) {
			// 移除旧 children
			if (isDef(oldCh)) {
				// 新节点删除了 children ,删除老的 DOM 元素
				removeVnodes(elm, oldCh, 0, oldCh.length - 1);
			}
			// 文本节点更新
			api.setTextContent(elm, vnode.text!);
		}
		// 调用 postpatch hook
		hook?.postpatch?.(oldVnode, vnode);
	}

	return function patch(oldVnode: VNode | Element, vnode: VNode): VNode {
		let i: number, elm: Node, parent: Node;
		const insertedVnodeQueue: VNodeQueue = [];
		// 执行 pre hook
		for (i = 0; i < cbs.pre.length; ++i) cbs.pre[i]();

		// 第一个参数不是 vnode
		if (!isVnode(oldVnode)) {
			// 创建一个空的 vnode，关联到这个 DOM 元素
			oldVnode = emptyNodeAt(oldVnode);
		}
		// 相同的 vnode (key 和 sel 都相等)
		if (sameVnode(oldVnode, vnode)) {
			// vnode 对比
			patchVnode(oldVnode, vnode, insertedVnodeQueue);
		}
		// 不同的 vnode，直接删掉重建
		else {
			elm = oldVnode.elm!;
			parent = api.parentNode(elm) as Node;

			// 创建新的 dom 节点 vnode.elm
			createElm(vnode, insertedVnodeQueue);

			// 判断父节点是存在
			if (parent !== null) {
				// 插入 dom
				api.insertBefore(parent, vnode.elm!, api.nextSibling(elm));
				// 移除旧 dom
				removeVnodes(parent, [oldVnode], 0, 0);
			}
		}

		// 执行 post hook
		for (i = 0; i < insertedVnodeQueue.length; ++i) {
			insertedVnodeQueue[i].data!.hook!.insert!(insertedVnodeQueue[i]);
		}
		for (i = 0; i < cbs.post.length; ++i) cbs.post[i]();
		return vnode;
	};
}
