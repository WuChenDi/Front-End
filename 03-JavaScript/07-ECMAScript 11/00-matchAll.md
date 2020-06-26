# matchAll

```javascript
const str = `
  <html>
    <body>
      <div>第一个div</div>
      <p>这是一个p</p>
      <span>span</span>
      <div>第二个div</div>
    <body>
  </html>
`;
const regExp = /<div>(.*)<\/div>/g;

{
	function selectDiv(regExp, str) {
		let matches = [];
		while (true) {
			const match = regExp.exec(str);
			if (match == null) {
				break;
			}
			matches.push(match[1]);
		}
		return matches;
	}
	const res = selectDiv(regExp, str);
	console.log(res); // [ '第一个div', '第二个div' ]
}

{
	console.log(str.match(regExp)); // [ '<div>第一个div</div>', '<div>第二个div</div>' ]
}

{
	function selectDiv(regExp, str) {
		let matches = [];
		str.replace(regExp, (all, first) => {
			matches.push(first);
		});
		return matches;
	}
	const res = selectDiv(regExp, str);
	console.log(res); // [ '第一个div', '第二个div' ]
}

{
	function selectDiv(regExp, str) {
		let matches = [];
		for (let match of str.matchAll(regExp)) {
			matches.push(match[1]);
		}
		return matches;
	}
	const res = selectDiv(regExp, str);
	console.log(res); // [ '第一个div', '第二个div' ]
}
```
