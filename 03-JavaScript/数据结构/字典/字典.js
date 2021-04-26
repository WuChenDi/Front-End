class Dictionary {
	constructor() {
		this.items = {};
	}

	set(key, value) {
		this.items[key] = value;
	}

	get(key) {
		return this.items[key];
	}

	remove(key) {
		delete this.items[key];
	}

	get keys() {
		return Object.keys(this.items);
	}

	get values() {
		return Object.keys(this.items).reduce((r, c, i) => {
			r.push(this.items[c]);
			return r;
		}, []);
	}
}
const dictionary = new Dictionary();
dictionary.set("Gandalf", "gandalf@email.com");
dictionary.set("John", "johnsnow@email.com");
dictionary.set("Tyrion", "tyrion@email.com");

console.log(dictionary);
console.log(dictionary.keys);
console.log(dictionary.values);
console.log(dictionary.items);
