#! /usr/bin/env node

import { program } from 'commander'
import { help } from '../lib/core/help.js'
import { commander } from '../lib/core/commander.js'

help(program)
commander(program)
program.parse(process.argv)
