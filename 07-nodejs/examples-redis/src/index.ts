import { Hono } from 'hono'
import { createClient } from 'redis'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const client = createClient({
  url: 'redis://localhost:6379',
  socket: {
    reconnectStrategy(retries) {
      if (retries > 20) {
        console.log('Too many attempts to reconnect. Redis connection was terminated')
        return new Error('Too many retries.')
      } else {
        return retries * 500
      }
    },
  },
})

client.on('ready', () => {
  console.log('Redis client is ready')
})

client.on('error', (error) => {
  console.error('Redis client error:', error)
})

await client.connect()

// await client.set('myname', 'wcd2', client.print)
await client.set('key', 'value')
const value = await client.get('key')

console.log(value)

export default app
