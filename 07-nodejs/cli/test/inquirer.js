import inquirer from 'inquirer'

inquirer.prompt([
  {
    type: 'input',
    name: 'username',
    message: 'Your Name',
  }
]).then((answer) => {
  console.log(answer);
})
