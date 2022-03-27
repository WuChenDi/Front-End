# Promise.allSettled()

```javascript
{
	Promise.all([
		Promise.reject({
			code: 500,
			msg: "服务异常",
		}),
		Promise.resolve({
			code: 200,
			data: ["1", "2", "3"],
		}),
		Promise.resolve({
			code: 200,
			data: ["4", "5", "6"],
		}),
	])
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err); // { code: 500, msg: '服务异常' }
		});
}

{
	// 无论结果是 fulfilled 还是 rejected, 无需 catch
	Promise.allSettled([
		Promise.reject({
			code: 500,
			msg: "服务异常",
		}),
		Promise.resolve({
			code: 200,
			data: ["1", "2", "3"],
		}),
		Promise.resolve({
			code: 200,
			data: ["4", "5", "6"],
		}),
	]).then((res) => {
		console.log(res);
		/* 
        [
          {
            reason: { code: 500, msg: "服务异常" },
            status: "rejected",
          },
          {
            status: "fulfilled",
            value: {
              code: 200,
              data: ["1", "2", "3"],
            },
          },
          {
            status: "fulfilled",
            value: {
              code: 200,
              data: ["4", "5", "6"],
            },
          },
        ];
      */
		const data = res.filter((item) => item.status === "fulfilled");
		console.log(data);
		/* 
        [
          {
            status: "fulfilled",
            value: {
              code: 200,
              data: ["1", "2", "3"],
            },
          },
          {
            status: "fulfilled",
            value: {
              code: 200,
              data: ["4", "5", "6"],
            },
          },
        ];
      */
	});
}
```
