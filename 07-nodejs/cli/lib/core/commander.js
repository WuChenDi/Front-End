import { action } from './action.js'

export const commander = (program) => {
  program
    .command('create <project> [other...]')
    .alias('crt')
    .description('Create project')
    .action(action)
}

