```js
const data = {
  PortLand: "78/50",
  Dublin: "88/52",
  Lima: "58/40"
};

Object.defineProperty(data, "Lima", {
  enumerable: false,
  writable: false
});

console.log(Object.keys(data));
// ["PortLand", "Dublin"]

console.log(Object.getOwnPropertyDescriptors(data));
// PortLand {value: "78/50",writable: true,enumerable: true,configurable: true}
// Dublin {value: "88/52",writable: true,enumerable: true,configurable: true}
// Lima {value: "88/52",writable: true,enumerable: false,configurable: true}

console.log(Object.getOwnPropertyDescriptor(data, "Lima"));
// {value: "58/40",writable: false,enumerable: false,configurable: true}

data.Lima = "59/50";
```
