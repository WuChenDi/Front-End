#!/usr/bin/env node

const lib = require('dd-cli-test-lib')

const { version } = require('../package.json')

const argv = require('process').argv
// console.log("🚀 ~ file: index.js:8 ~ argv", argv)

const command = argv[2]

const options = argv.slice(3)
if (options.length > 1) {
  // console.log("🚀 ~ file: index.js:14 ~ options", options)
  let [option, param] = options

  option = option.replace('--', '')
  // console.log("🚀 ~ file: index.js:18 ~ param", param)
  // console.log("🚀 ~ file: index.js:19 ~ option", option)

  if (!command) return console.error('Please enter a command')

  lib[command] ? lib[command]({ option, param }) : console.log('Invalid command')

  // if (lib[command]) {
  //   lib[command]()
  // } else {
  //   console.log('Invalid command')
  // }

  // console.log('welcome dd cli test!!!')
}

if (command.startsWith('--') || command.startsWith('-')) {
  const globalOption = command.replace(/--|-/g, '')
  if (globalOption === 'version' || globalOption === 'V') {
    console.log(version)
  }
}
