// 剑指 Offer 30. 包含min函数的栈

// 定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

/**
 * initialize your data structure here.
 */
 var MinStack = function () {
  // [{value: x, minValue: x}]
  this.taskQueue = []
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  const { taskQueue } = this
  const { length } = taskQueue
  taskQueue.push({
    value: x,
    min: length ? Math.min(x, this.min()) : x
  })
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const { taskQueue } = this
  taskQueue.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  const { taskQueue } = this
  const { length } = taskQueue
  return taskQueue[length - 1].value
};

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
  const { taskQueue } = this
  const { length } = taskQueue
  return taskQueue[length - 1].min
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
