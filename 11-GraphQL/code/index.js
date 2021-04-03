const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const schema = buildSchema(`
  type Account {
    name: String,
    age: Int,
    sex: String,
    department: String
  }
  type Query {
    hello: String,
    userName: String,
    age: Int,
    account: Account
  }
`);

const root = {
	hello: () => "Hello world!",
	userName: () => "wcd",
	age: () => 25,
	account: () => {
		return {
			name: "wcd",
			age: 25,
			sex: "boy",
			department: "technical division",
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
