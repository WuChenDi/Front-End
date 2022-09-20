import ora from 'ora'

const spinner = ora().start()

spinner.text = 'loading……'

await new Promise(res => setTimeout(res, 3000));

console.log(111);
spinner.succeed('End')
spinner.fail('End')
spinner.info('End')
