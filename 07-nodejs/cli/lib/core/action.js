

import inquirer from 'inquirer'
import config from '../../config.js'
import { downloadFun } from './download.js'

export const action = async (project, args) => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      choices: config.framework,
      message: 'Please select the frame you are using'
    }
  ])
  console.log(answer)
  // 下载代码模板
  downloadFun(config.frameworkUrl[answer.framework], project)
}
