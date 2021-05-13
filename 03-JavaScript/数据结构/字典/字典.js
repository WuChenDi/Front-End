class Dictionary {
	constructor() {
		this.items = {};
	}

	// 添加一个存储键值对
	set(key, value) {
		this.items[key] = value;
	}

	// 根据key返回一个item
	get(key) {
		return this.items.hasOwnProperty(key) ? this.items[key] : undefined;
	}

	// 删除一个存储键值对
	remove(key) {
		if (this.items.hasOwnProperty(key)) {
			delete this.items[key];
		}
	}

  // 返回字典中 key
	get keys() {
		return Object.keys(this.items);
	}

  // 返回字典中 value
	get values() {
		return Object.keys(this.items).reduce((r, c, i) => {
			r.push(this.items[c]);
			return r;
		}, []);
	}
}
const dictionary = new Dictionary();
dictionary.set("zhangsan", "zhangsan@email.com");
dictionary.set("lisi", "lisi@email.com");
dictionary.set("zhaowu", "zhaowu@email.com");

console.log(dictionary);
console.log(dictionary.keys);
console.log(dictionary.values);
console.log(dictionary.items);

console.log("------------------------");
dictionary.remove("zhaowu");
console.log(dictionary.get("zhaowu"));
