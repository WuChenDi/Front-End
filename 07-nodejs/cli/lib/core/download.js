import download from 'download-git-repo'
import ora from 'ora'
import chalk from 'chalk'

export const downloadFun = (url, project) => {
  const spinner = ora().start()
  spinner.text = 'The code is being downloaded at ......'

  download('direct:' + url, project, { clone: true }, (err) => {
    if (!err) {
      spinner.succeed('Code download successfully')
      console.log(chalk.blue.bold('Done!'), chalk.bold('you run:'));
      console.log('cd ' + project);
      console.log('npm install ');
      console.log('npm run dev ');
    } else {
      spinner.fail('Code download failed')
    }
  })
}
