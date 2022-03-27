class HasTable {
  constructor() {
    this.storage = [];
    this.count = 0;
    this.limit = 7;
  }

  //哈希函数
  hasFunc(str, size = 7) {
    // 质数
    const PRIME_NUMBER = 37;
    // 定义 hasCode 变量
    let hasCode = 0;
    // 霍纳算法，来计算hasCode的值
    for (let i = 0; i < str.length; i++) {
      hasCode = PRIME_NUMBER * hasCode + str.charCodeAt(i);
    }
    // 取余操作
    return hasCode % size;
  }

  // 插入修改操作
  put(key, value) {
    // 根据Key获取index
    let index = this.hasFunc(key, this.limit);
    // 根据index取出对应的bucket
    let bucket = this.storage[index];
    // 判断bucket是否为null
    if (bucket == null) {
      bucket = [];
      this.storage[index] = bucket;
    }
    // 判断是否修改数据
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) {
        tuple[1] = value;
        return;
      }
    }
    // 添加操作
    bucket.push([key, value]);
    this.count++;
  }

  // 获取操作
  get(key) {
    // 根据key获取index
    const index = this.hasFunc(key, this.limit);
    // 根据index获取对应的bucket
    const bucket = this.storage[index];
    // 判断bucket是否空
    if (bucket === null) {
      return null;
    }
    // 有bucket那么进行线性查找
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) {
        return tuple[1];
      }
    }
    // 没有找到，那么返回Null
    return null;
  }

  // 删除操作
  remove(key) {
    // 根据key获取index
    const index = this.hasFunc(key, this.limit);
    // 根据index获取对应的bucket
    const bucket = this.storage[index];
    // 判断bucket是否空
    if (bucket === null) {
      return null;
    }
    // 有bucket那么进行线性查找,并且删除
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i];
      if (tuple[0] === key) {
        bucket.splice(i, 1);
        this.count--;
        return tuple[1];
      }
    }
    // 没有找到，那么返回Null
    return null;
  }

  // 判断哈希表是否为空
  isEmpty() {
    return this.count === 0;
  }

  // 获取哈希表元素个数
  size() {
    return this.count;
  }
}

const hasTable = new HasTable();
hasTable.put("zhangsan", "张三");
hasTable.put("lisi", "李四");
console.log(hasTable.get("zhangsan"));
console.log(hasTable.get("lisi"));
console.log(hasTable.storage);

hasTable.remove("lisi");
console.log(hasTable.get("lisi"));

console.log(hasTable.storage);
