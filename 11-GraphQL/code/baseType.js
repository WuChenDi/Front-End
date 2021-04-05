const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

// 定义schema 查询和类型
/**
 * 传输传递
 * 与 js 传递参数一样，小括号内定义行参，但是注意：传输需要定义类型
 * !() 代表传输不能为空
 * type Query {
 *  rollDice(numDice: Int!, numSides: Int): [Int]
 * }
 */
const schema = buildSchema(`
  type Account {
    name: String
    age: Int
    sex: String
    department: String
    salary(city: String): Int
  }
  type Query {
    getClassMates(classNo: Int!): [String]
    account(username: String): Account
  }
`);

const root = {
	getClassMates: ({ classNo }) => {
		const obj = {
			31: ["张三", "李四", "赵五"],
			61: ["张小三", "李小四", "赵小五"],
		};
		return obj[classNo];
	},
	account: ({ username }) => {
		const name = username;
		const sex = "boy";
		const age = 25;
		const department = "technical division";
		const salary = ({ city }) => {
			if (city === "北京" || city === "上海" || city === "广州") {
				return 10000;
			}
			return 3000;
		};
		return {
			name,
			age,
			sex,
			department,
			salary,
		};
	},
};

const app = express();

app.use(
	"/graphql",
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	})
);

app.listen(3000, () => console.log("Now browse to localhost:3000/graphql"));
