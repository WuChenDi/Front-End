{
  const mainAwait = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(100)
      }, 500)
    })
  }
  const output = await mainAwait()
  console.log(output) // 100
  setTimeout(() => console.log(output, 1000)) // 1000

  // TS1375: 'await' expressions are only allowed at the top level of a file when that file is a module, but this file has no imports or exports. Consider adding an empty 'export {}' to make this file a module.

  // 仅当文件是模块时，才允许在该文件的顶层使用 "await" 表达式，但此文件没有导入或导出。请考虑添加空的 "export {}" 以将此文件变为模块。
}

export {}
