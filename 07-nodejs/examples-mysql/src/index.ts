import { Hono } from 'hono'
import mysql from 'mysql2/promise'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Create the connection to database
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'dd',
})

// Execute sql statement
const sql = 'SELECT * FROM `tasks`'
// const sql = 'SELECT id, title, description FROM `tasks`'
// const sql = `SELECT * FROM tasks WHERE id='1'`
// const sql = `UPDATE tasks SET description='sql description' WHERE id=1`
// const sql = `UPDATE tasks SET title='test title' where title='title 12332111111'`
// const sql = `INSERT INTO tasks (title, description, createdAt, updatedAt) values ('test title', 'test description', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}')`

try {
  const [results, fields] = await connection.query(sql)
  // results contains rows returned by server
  console.log(results)
  // fields contains extra meta data about results, if available
  console.log(fields)
} catch (err) {
  console.log(err)
}

export default app
