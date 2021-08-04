const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

const isLib = process.env.TYPE === 'lib'
console.log(isLib)

module.exports = {
  configureWebpack(config) {
    console.log(config.plugins)
  },
  chainWebpack(config) {
    // console.log('config.plugin', config.plugin) // config.plugin [Function: plugin]
    if (!isLib) {
      config.plugin('monaco').use(new MonacoWebpackPlugin())
    }
    config.plugin('circular').use(new CircularDependencyPlugin())
  }
}
