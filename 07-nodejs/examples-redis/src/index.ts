import { Hono } from 'hono'
import { createClient } from 'redis'
import logger from './utils/logger'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Redis official website: https://redis.io
 *
 * Redis JavaScript client documentation: https://redis.js.org
 */
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
  logger.log('Event ready, Redis client is ready')
})

client.on('reconnecting', () => {
  logger.log('Event reconnecting, Redis client is reconnecting')
})

client.on('end', () => {
  logger.log('Event end, Redis client connection has been closed')
})

client.on('error', (error) => {
  logger.log('----- Event error, Redis client error: -----')
  logger.error(error)
})

logger.log('Before client.connect()...')

// isOpen will return False here as the client's socket is not open yet.
// isReady will return False here, client is not yet ready to use.
logger.log(`client.isOpen: ${client.isOpen}, client.isReady: ${client.isReady}`)

const connectPromise = client.connect()
// await client.connect()

logger.log('Init, After client.connect()...')

// isOpen will return True here as the client's socket is open now.
// isReady will return False here as the promise hasn't resolved yet.
logger.log(`Init, client.isOpen: ${client.isOpen}, client.isReady: ${client.isReady}`)

await connectPromise
logger.log('Init, Afer connectPromise has resolved...')

// isOpen will return True here as the client's socket is open now.
// isReady will return True here, client is ready to use.
logger.log(`Init, client.isOpen: ${client.isOpen}, client.isReady: ${client.isReady}`)

try {
  // Returns PONG
  logger.log('----- Response from PING command -----')
  logger.log(`${await client.ping()}`)
  logger.log('----- Response from PING command -----')

  // Get the time from the Redis Server.
  const serverTime = await client.time()
  logger.log('----- Server time -----')
  logger.log(serverTime)
  logger.log('----- Server time -----')

  await delay(2000)

  // Corner of Market Street (ID: 12) and 10th street (ID:27).
  // await client.pfAdd('count:sf:12:27', 'GHN34X')
  // await client.pfAdd('count:sf:12:27', 'ECN94Y')
  // await client.pfAdd('count:sf:12:27', 'VJL12V')
  // await client.pfAdd('count:sf:12:27', 'ORV87O')

  // // To get the count of Corner of Market Street (ID: 12) and 10th street (ID:27).
  // const countForMarket10thStreet = await client.pfCount('count:sf:12:27')
  // logger.log(`Count for Market Street & 10th Street is ${countForMarket10thStreet}`)
  // // Count for Market Street & 10th Street is 4.

  async function generateUniqueKey() {
    let key
    let attempts = 0
    do {
      key = Math.random().toString(36).substring(2)
      attempts++
    } while ((await client.exists(key)) && attempts < 100)
    if (attempts === 100) {
      throw new Error('Failed to generate a unique key after 100 attempts')
    }
    return key
  }

  function generateRandomValue() {
    return Math.random().toString(36).substring(2)
  }

  const defaultKey = 'key'
  const generatedKey = await generateUniqueKey()
  const targetKey = generatedKey || defaultKey
  const generatedValue = generateRandomValue()

  logger.log('targetKey:', targetKey)
  logger.log('generatedValue:', generatedValue)
  const keyExists = await client.exists(targetKey)

  if (keyExists !== 1) {
    await client.set(targetKey, generatedValue)
    // await client.set(defaultKey, generatedValue, {
    //   EX: 60,
    //   GET: true,
    // })
  }

  const targetValue = await client.get(targetKey)
  logger.log('redis value:', targetValue)

  async function getAllKeys() {
    let cursor = 0
    let keys: string[] = []

    do {
      const { cursor: nextCursor, keys: scanKeys } = await client.scan(cursor)
      cursor = nextCursor
      keys = keys.concat(scanKeys)
    } while (cursor !== 0)

    return keys
  }

  async function getAllKeyValues() {
    const keys = await getAllKeys()
    const values = await Promise.all(keys.map((key) => client.get(key)))
    const keyValuePairs = keys.reduce(
      (obj, key, index) => {
        if (values[index] !== null) {
          obj[key] = values[index] as string
        }
        return obj
      },
      {} as Record<string, string>
    )
    return keyValuePairs
  }

  const keyValuePairs = await getAllKeyValues()
  console.log(keyValuePairs)
} catch (error) {
  logger.log('----- something went wrong -----')
  logger.error(error)
  await client.quit()
}

export default app
