// 剑指 Offer 09. 用两个栈实现队列

// 用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

var CQueue = function () {
  this.taskQueueA = []
  this.taskQueueB = []
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  const { taskQueueA } = this
  taskQueueA.push(value)
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  const { taskQueueA, taskQueueB } = this;

  if (!taskQueueA.length && !taskQueueB.length) {
    return -1
  }
  if (!taskQueueB.length) {
    while (taskQueueA.length) {
      taskQueueB.push(taskQueueA.pop())
    }
  }
  return taskQueueB.pop()
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
