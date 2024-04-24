import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { graphqlServer } from '@hono/graphql-server'
import { buildSchema } from 'graphql'

console.log('process.env.SERVER_PORT:', process.env.SERVER_PORT)

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

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
`)

const rootResolver = (ctx: any) => {
  console.log(ctx)

  return {
    hello: () => 'Hello Hono!',
    userName: () => 'wcd',
    age: () => 25,
    account: () => {
      return {
        name: 'wcd',
        age: 25,
        sex: 'boy',
        department: 'technical division',
      }
    },
  }
}

app.use(cors())

app.use(
  '/graphql',
  graphqlServer({
    schema,
    rootResolver,
    pretty: true,
  })
)

app.fire()

// export default app
export default {
  port: process.env.SERVER_PORT || 3000,
  fetch: app.fetch,
}
