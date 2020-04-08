interface List {
	readonly id: number;
	name: string;
	// [x: string]: any;
	age?: number;
}
interface Result {
	data: List[];
}
function render(result: Result) {
	result.data.forEach((value) => {
		console.log(value.id, value.name); // 1 "A"  2 "B"
		if (value.age) {
			console.log(value.age); // 10
		}
		// value.id++
	});
}
let result = {
	data: [
		{ id: 1, name: "A", sex: "male" },
		{ id: 2, name: "B", age: 10 },
	],
};
render(result);
// render({
// 	data: [
// 		{ id: 1, name: "A", sex: "male" },
// 		{ id: 2, name: "B" },
// 	],
// } as Result);

// render(<Result>{
// 	data: [
// 		{ id: 1, name: "A", sex: "male" },
// 		{ id: 2, name: "B" },
// 	],
// });

interface StringArray {
	[index: number]: string;
}
let chars: StringArray = ["A", "B"];

// interface Names {
// 	[x: string]: string;
// 	// y: number;
// 	[z: number]: number;
// }

interface Names {
	[x: string]: any;
	// y: number;
	[z: number]: number;
}
