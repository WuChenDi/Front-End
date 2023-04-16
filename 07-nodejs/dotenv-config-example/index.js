const config = require('config')
require('dotenv').config()

console.log(process.env)

const dbConfig = config.get('db')
console.log("🚀 ~ file: index.js:7 ~ dbConfig:", dbConfig)
