// call
Function.prototype.Dcall = function (context) {
	var context = context || window;
	context.say = this;
	var args = [];
	for (let i = 1; i < arguments.length; i++) {
		args.push("arguments[" + i + "]");
	}
	var result = eval("context.say(" + args + ")");
	delete context.say;
	return result;
};

// apply
Function.prototype.Dapply = function (context, arr) {
	var context = context || window;
	var result;
	context.fn = this;
	if (!arr) {
		result = context.fn();
	} else {
		var args = [];
		for (let i = 0; i < arr.length; i++) {
			args.push("arr[" + i + "]");
		}
		result = eval("context.fn(" + args + ")");
	}
	return result;
};

// bind
Function.prototype.Dbind = function (context) {
	var self = this;
	var args = Array.prototype.slice.call(arguments, 1);
	return function () {
		var bindArgs = Array.prototype.slice.call(arguments);
		return self.apply(context, args.concat(bindArgs));
	};
};

// new
Function.prototype.Nnew = function (fn, ...args) {
	var obj = Object.create(fn.prototype);
	var ret = fn.apply(obj, args);
	return ret instanceof Object ? ret : obj;
};

// 或
// Function.prototype.Dnew = function () {
// 	var obj = {};
// 	var Constructor = Array.prototype.shift.call(arguments);
// 	obj.__proto__ = Constructor.prototype;
// 	var result = Constructor.call(obj, arguments);
// 	return result instanceof Object ? result : obj;
// };
