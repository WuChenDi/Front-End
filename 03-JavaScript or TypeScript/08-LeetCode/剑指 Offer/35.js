// 剑指 Offer 35. 复杂链表的复制

// 请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  if (!head) return null
  const linkMap = new Map()
  let node = head
  // 遍历旧节点，复制各节点值
  while (node) {
    const { val } = node
    linkMap.set(node, new Node(val))
    node = node.next
  }
  node = head
  // 遍历旧节点，复制连接关系
  while (node) {
    const { random } = node
    linkMap.get(node).next = node.next ? linkMap.get(node.next) : null
    linkMap.get(node).random = random ? linkMap.get(random) : null
    node = node.next
  }
  return linkMap.get(head)
}
