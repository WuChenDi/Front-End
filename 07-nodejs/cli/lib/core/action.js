import axios from 'axios'
import inquirer from 'inquirer'
import { downloadFun } from './download.js'

export const action = async (project, args) => {
  const { username } = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Please enter the github user nickname',
    }
  ])

  if (!username) return console.log('Please enter the correct nickname')

  const config = {
    framework: [],
    frameworkUrl: {}
  }

  const response = await axios.get(`https://api.github.com/users/${username}/repos`)

  const { data } = response

  const framework = data.map(({ name }) => (name))

  if (framework.length <= 0) return console.log('No data')

  const frameworkList = {}
  data.forEach(element => {
    Object.assign(frameworkList, { [element.name]: element.clone_url })
  });

  config.framework = framework
  config.frameworkUrl = frameworkList

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
  downloadFun(config.frameworkUrl[answer.framework], `${project}/${answer.framework}`)
}
