#! /usr/bin/env node

// console.log('cli');
// console.log(process.argv)
// if(process.argv[2]== '--help'){
//   console.log('The command parameters are obtained');
// }

// const { program } = require('commander')

// program.option('-f --framework <framework>', 'Setting the frame')
// program
//   .command('create <project> [other...]')
//   .alias('crt')
//   .description('Create project')
//   .action((project, args) => {
//     console.log("🚀 ~ file: cli.js ~ line 17 ~ .action ~ project, args", project, args)
//   })
// program.parse(process.argv)

// const { program } = require('commander')
// const help = require('../lib/core/help')
// const commander = require('../lib/core/commander')

// help(program)
// commander(program)
// program.parse(process.argv)

import { program } from 'commander'
import { help } from '../lib/core/help.js'
import { commander } from '../lib/core/commander.js'

help(program)
commander(program)
program.parse(process.argv)
