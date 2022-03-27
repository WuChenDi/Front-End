// 剑指 Offer 24. 反转链表

// 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let [cur, pre] = [head, null]
  while (cur) [cur.next, pre, cur] = [pre, cur, cur.next]
  return pre
}
