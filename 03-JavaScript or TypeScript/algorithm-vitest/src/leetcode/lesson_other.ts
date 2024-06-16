export function findBinarySubstrings(str: string): string[] {
  // 建立数据结构，堆栈，保存数据
  const r: string[] = []

  // 给定任意子输入都返回第一个符合条件的子串
  const match = (str: string): string => {
    const j = str.match(/^(0+|1+)/)?.[0] || ''
    const o = (Number.parseInt(j[0], 10) ^ 1).toString().repeat(j.length)
    const reg = new RegExp(`^(${j}${o})`)
    if (reg.test(str)) {
      return RegExp.$1
    } else {
      return ''
    }
  }

  // 通过for循环控制程序运行的流程
  for (let i = 0, len = str.length - 1; i < len; i++) {
    const sub = match(str.slice(i))
    if (sub) {
      r.push(sub)
    }
  }
  return r
}
