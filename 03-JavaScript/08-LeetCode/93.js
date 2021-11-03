// 93. 复原 IP 地址

// 给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能从 s 获得的 有效 IP 地址 。你可以按 任何 顺序返回答案。

// 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

// 例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const { length } = s
  if (length < 4 || length > 12) {
    throw new Error('无效 IP 地址')
  }

  const result = []

  const dfs = (start, p, path) => {
    if (p === 4) {
      if (start === length) {
        result.push(path)
      }
      return
    }

    let c = ''
    for (let i = start; i < start + 3; i++) {
      c += s[i]
      if (c > 255) break

      dfs(i + 1, p + 1, path + c + (p === 3 ? '' : '.'))

      if (Number.parseInt(s[start]) === 0) break
    }
  }

  dfs(0, 0, '')
  return result
}

const s = '010010'
console.log(restoreIpAddresses(s))
